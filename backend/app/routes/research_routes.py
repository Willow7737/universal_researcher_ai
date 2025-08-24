
import os
import uuid
from typing import List, Dict

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app import models, deps, database
from app.knowledge.qdrant_client import VectorClient
from app.knowledge.neo4j_client import Neo4jClient

router = APIRouter(prefix="/research", tags=["Research"])

# Initialize clients from env (fail soft where sensible)
QDRANT_URL = os.getenv("QDRANT_URL", "http://localhost:6333")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY", None)
QDRANT_PORT = int(os.getenv("QDRANT_PORT", "6333"))
COLLECTION = os.getenv("QDRANT_COLLECTION", "research_docs")

NEO4J_URI = os.getenv("NEO4J_URI", "")
NEO4J_USER = os.getenv("NEO4J_USER", "")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD", "")

vec = VectorClient(QDRANT_URL, QDRANT_PORT, QDRANT_API_KEY, COLLECTION)
neo = Neo4jClient(NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD) if NEO4J_URI and NEO4J_USER and NEO4J_PASSWORD else Neo4jClient("", "", "")

class QueryIn(BaseModel):
    q: str
    limit: int = 8

class SeedDoc(BaseModel):
    title: str
    text: str
    source: str = "seed"
    id: str | None = None

@router.post("/seed_demo")
def seed_demo(docs: List[SeedDoc], db: Session = Depends(database.get_db), user=Depends(deps.get_admin_user)):
    if not docs:
        raise HTTPException(status_code=400, detail="No documents provided")
    items = []
    for d in docs:
        did = d.id or str(uuid.uuid4())
        # persist to Postgres
        db.merge(models.Document(id=did, title=d.title, text=d.text, source=d.source))
        # light graph link
        try:
            neo.create_document_node(did, d.title, d.source)
        except Exception:
            pass
        items.append({"id": did, "text": d.text, "metadata": {"title": d.title, "source": d.source}})
    db.commit()
    # upsert to vector
    vec.upsert(items)
    return {"ok": True, "count": len(items)}

@router.post("/query")
def query(qin: QueryIn, db: Session = Depends(database.get_db), user=Depends(deps.get_current_user)):
    if not qin.q or not qin.q.strip():
        raise HTTPException(status_code=400, detail="Empty query")
    results = vec.search(qin.q, limit=qin.limit)
    # try to enrich from postgres
    enriched: List[Dict] = []
    ids = [r.get("id") for r in results if r.get("id")]
    if ids:
        docs = {d.id: d for d in db.query(models.Document).filter(models.Document.id.in_(ids)).all()}
    else:
        docs = {}
    for r in results:
        rid = r.get("id")
        doc = docs.get(rid)
        enriched.append({
            "id": rid,
            "score": r.get("score"),
            "title": (doc.title if doc else r.get("metadata", {}).get("title")),
            "source": (doc.source if doc else r.get("metadata", {}).get("source")),
            "snippet": (doc.text[:400] + ("..." if doc and len(doc.text) > 400 else "")) if doc else None
        })
    return {"query": qin.q, "results": enriched}

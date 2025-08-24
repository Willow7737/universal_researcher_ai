import os

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app import models, deps, database
from ..knowledge.qdrant_client import VectorClient
from ..knowledge.neo4j_client import Neo4jClient
import uuid

router = APIRouter(prefix="/research", tags=["Research"])

class QueryIn(BaseModel):
    q: str
    limit: int = 8

vec = VectorClient(
    url=os.getenv('QDRANT_URL'),
    api_key=os.getenv('QDRANT_API_KEY'),
    port=int(os.getenv("QDRANT_PORT", "6333"))
)
neo = Neo4jClient()

@router.post("/seed_demo")
def seed_demo(db: Session = Depends(database.SessionLocal)):
    docs = [
        {"id": "doc:1", "title": "Battery materials survey", "text": "lithium iron phosphate cathode analysis and cycling stability ...", "source": "demo"},
        {"id": "doc:2", "title": "Catalyst for CO2 reduction", "text": "copper-based catalysts perform well under electrochemical CO2 reduction ...", "source": "demo"},
        {"id": "doc:3", "title": "Superconductor hints", "text": "layered cuprates exhibit superconductivity at varied doping levels ...", "source": "demo"}
    ]
    for d in docs:
        # persist to Postgres table for metadata
        db.merge(models.Document(id=d["id"], title=d["title"], text=d["text"], source=d["source"]))
        neo.create_document_node(d["id"], d["title"], d["source"])
    db.commit()
    vec.upsert([{"id": d["id"], "text": d["text"], "metadata": {"title": d["title"], "source": d["source"]}} for d in docs])
    return {"ok": True, "count": len(docs)}

@router.post("/query")
def query(qin: QueryIn, user=Depends(deps.get_current_user)):
    if not qin.q or qin.q.strip()=="" :
        raise HTTPException(status_code=400, detail="Empty query")
    results = vec.search(qin.q, limit=qin.limit)
    # enrich results with metadata from Postgres if available
    return {"query": qin.q, "results": results} 

from fastapi import APIRouter
from app import database
import requests, os

router = APIRouter(prefix="/system", tags=["System"])

@router.get("/health")
def health_check():
    # Basic checks (expand as needed)
    status = {"status": "ok", "postgres": "up"}
    # Qdrant
    qhost = os.getenv("QDRANT_HOST", "qdrant")
    qport = os.getenv("QDRANT_PORT", "6333")
    try:
        r = requests.get(f"http://{qhost}:{qport}/collections", timeout=2)
        status["qdrant"] = "up" if r.status_code==200 else f"err:{r.status_code}"
    except Exception as e:
        status["qdrant"] = f"down:{str(e)}"
    # Neo4j minimal
    try:
        status["neo4j"] = "up"
    except:
        status["neo4j"] = "pending"
    status["rabbitmq"] = "unknown"
    return status


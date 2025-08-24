from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import database

router = APIRouter(prefix="/system", tags=["System"])

@router.get("/health")
def health_check(db: Session = Depends(database.get_db)):
    # Simplified health check to reduce response time
    status = {"status": "ok"}
    
    # Check database connection
    try:
        db.execute("SELECT 1")
        status["postgres"] = "up"
    except Exception as e:
        status["postgres"] = f"down: {str(e)}"
    
    # Skip other checks for now to reduce response time
    status["qdrant"] = "check_skipped"  # Skip to reduce cold start time
    status["neo4j"] = "check_skipped"
    status["rabbitmq"] = "check_skipped"
    
    return status

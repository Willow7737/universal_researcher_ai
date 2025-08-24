
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app import models, database, deps
from app.security import get_password_hash

router = APIRouter(prefix="/admin", tags=["Admin"])

class UserCreate(BaseModel):
    username: str
    password: str
    role: str = "user"

@router.post("/users")
def create_user(data: UserCreate, db: Session = Depends(database.get_db), _: models.User = Depends(deps.get_admin_user)):
    if db.query(models.User).filter(models.User.username == data.username).one_or_none():
        raise HTTPException(status_code=400, detail="User already exists")
    hashed_pw = get_password_hash(data.password)
    user = models.User(username=data.username, password_hash=hashed_pw, role=data.role)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"id": user.id, "username": user.username, "role": user.role}

@router.get("/users")
def list_users(db: Session = Depends(database.get_db), _: models.User = Depends(deps.get_admin_user)):
    users = db.query(models.User).all()
    return [{"id": u.id, "username": u.username, "role": u.role, "created_at": u.created_at.isoformat()} for u in users]

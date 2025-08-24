from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app import models, auth, deps, database

router = APIRouter(prefix="/auth", tags=["Auth"])

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest, db: Session = Depends(database.SessionLocal)):
    user = db.query(models.User).filter(models.User.username == data.username).one_or_none()
    if not user or not auth.verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = auth.create_access_token({"sub": user.username, "role": user.role})
    return TokenResponse(access_token=token)


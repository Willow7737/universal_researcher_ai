from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session

from app import models, auth, database
from app.schemas import LoginRequest, TokenResponse

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=TokenResponse)
def login(
    data: LoginRequest = Body(...),
    db: Session = Depends(database.SessionLocal)
):
    user = db.query(models.User).filter(models.User.username == data.username).one_or_none()
    if not user or not auth.verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = auth.create_access_token({"sub": user.username, "role": user.role})
    return TokenResponse(access_token=token)

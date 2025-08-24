from sqlalchemy.orm import Session
from . import models, database
from .security import get_password_hash  # Import from security instead of auth

def ensure_admin(username: str, password: str):
    db = database.SessionLocal()
    try:
        u = db.query(models.User).filter(models.User.username == username).one_or_none()
        if u is None:
            hashed = get_password_hash(password)  # Use the function from security
            user = models.User(username=username, password_hash=hashed, role="admin")
            db.add(user)
            db.commit()
    finally:
        db.close()

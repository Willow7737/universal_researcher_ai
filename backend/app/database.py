import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg://researchdb_09li_user:Z6G74V8HLdSqVHEVfKd9RDhfeDmqYqB3@dpg-d2ksga3ipnbc73fhr580-a.oregon-postgres.render.com:5432/researchdb_09li"
)

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

Base = declarative_base()

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

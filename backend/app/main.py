import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth_routes, admin_routes, system_routes, research_routes
from app import database, models

app = FastAPI(title="Universal Researcher AI - Backend")

@app.on_event("startup")
def _startup_create_tables():
    from app.database import Base, engine
    Base.metadata.create_all(bind=engine)


# Allow frontend(s) to connect
origins_env = os.getenv("CORS_ORIGINS", "")
origins = origins

# If no environment variable set, default to production frontend and local dev
if not origins:
    origins = [
        "https://universal-researcher-ai.vercel.app",  # your Vercel frontend
        "http://localhost:3000",  # for local development
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
models.Base.metadata.create_all(bind=database.engine)

# Bootstrap admin user if requested
if os.getenv("BOOTSTRAP_ADMIN", "false").lower() in ("1", "true", "yes"):
    from app.crud import ensure_admin
    ensure_admin(
        os.getenv("BOOTSTRAP_ADMIN_USERNAME", "admin"),
        os.getenv("BOOTSTRAP_ADMIN_PASSWORD", "admin")
    )

# Register routes
app.include_router(auth_routes.router)
app.include_router(admin_routes.router)
app.include_router(system_routes.router)
app.include_router(research_routes.router)

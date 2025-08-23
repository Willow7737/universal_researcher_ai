import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import auth_routes, admin_routes, system_routes, research_routes
from . import database, models, utils

app = FastAPI(title="Universal Researcher AI - Backend")

# Allow frontend(s) to connect
origins_env = os.getenv("CORS_ORIGINS", "")
origins = [o.strip() for o in origins_env.split(",") if o.strip()]

# sensible defaults for local + your Vercel app
if not origins:
    origins = [
        "http://localhost:3000",
        "https://universalresearcherai.vercel.app",  # your frontend on Vercel
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=database.engine)

# Bootstrap admin user if requested
if os.getenv("BOOTSTRAP_ADMIN", "false").lower() in ("1", "true", "yes"):
    from .crud import ensure_admin
    ensure_admin(os.getenv("BOOTSTRAP_ADMIN_USERNAME", "admin"),
                 os.getenv("BOOTSTRAP_ADMIN_PASSWORD", "admin"))

app.include_router(auth_routes.router)
app.include_router(admin_routes.router)
app.include_router(system_routes.router)
app.include_router(research_routes.router)


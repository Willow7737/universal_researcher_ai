# Universal Researcher AI — Merged MVP Scaffold

This repository merges the Research Engine and Auth/Admin service and includes a simple React frontend dashboard.
It is intended for local development and testing. Services run via docker-compose.

## Quick start (dev)
1. Copy `.env.example` to `.env` and adjust if needed.
2. From repo root run:
   ```bash
   docker compose up --build
   ```
3. Frontend: http://localhost:3000
   Backend API: http://localhost:8000/docs

## Notes
- A bootstrap admin user (`admin` / `admin`) is created at startup for convenience (controlled by BOOTSTRAP_ADMIN env).
- Embeddings: the backend supports `sentence-transformers` if installed; otherwise, it will fall back to TF-IDF.
- The system is designed so heavy embedding/encoding work can be offloaded to a scalable encoder worker (see `app/utils/embeddings.py`).



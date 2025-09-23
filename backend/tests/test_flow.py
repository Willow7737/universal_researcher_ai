import pytest
from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_full_flow():
    response = client.post("/full-flow", json={"topic": "quantum computing"})
    assert response.status_code == 200
    data = response.json()
    assert "hypotheses" in data
    assert len(data["hypotheses"]) > 0

def test_ingest():
    response = client.post("/ingest", json={"topic": "AI ethics", "sources": ["paper"]})
    assert response.status_code == 200
    assert len(response.json()) > 0
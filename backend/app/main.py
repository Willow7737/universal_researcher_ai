from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.models.schemas import (
    IngestionInput, CuratedData, KnowledgeEntity, Hypothesis, 
    SimulationResult, ValidationResult, EthicsCheck
)
from app.services.ingestion import ingest_and_curate
from app.services.modeling import model_knowledge
from app.services.hypothesis import generate_hypotheses
from app.services.simulation import run_simulation
from app.services.validation import validate_experiment
from app.services.learning import update_model
from app.services.ethics import ethics_review_hypothesis, check_data_quality
from typing import List
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize FastAPI application with metadata
app = FastAPI(
    title="Universal Researcher AI Backend",
    description="Automated research pipeline with 6-stage workflow",
    version="1.0.0"
)

# Configure CORS middleware for cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "https://your-vercel-app.vercel.app"  # Production frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)
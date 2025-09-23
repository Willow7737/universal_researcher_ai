from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models.schemas import (
    IngestionInput, CuratedData, KnowledgeEntity, Hypothesis, 
    SimulationResult, ValidationResult, EthicsCheck
)
from services.ingestion import ingest_and_curate
from services.modeling import model_knowledge
from services.hypothesis import generate_hypotheses
from services.simulation import run_simulation
from services.validation import validate_experiment
from services.learning import update_model
from services.ethics import ethics_review_hypothesis, check_data_quality
from typing import List
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI(title="Universal Researcher AI Backend")

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-vercel-app.vercel.app"],  # Update for prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/ingest", response_model=List[CuratedData])
def ingest_data(input: IngestionInput):
    try:
        return ingest_and_curate(input)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/model", response_model=List[KnowledgeEntity])
def model(input_data: List[CuratedData]):
    try:
        return model_knowledge(input_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/hypothesis")
def hypothesize(entities: List[KnowledgeEntity], topic: str):
    try:
        hyps = generate_hypotheses(entities, topic)
        # Ethics gate
        checked = [ethics_review_hypothesis(h) for h in hyps]
        approved_hyps = [h for h, check in zip(hyps, checked) if check.approved]
        return {"hypotheses": approved_hyps, "ethics": checked}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/simulate", response_model=SimulationResult)
def simulate(hypothesis: dict):  # Expects Hypothesis-like dict
    try:
        # Ethics gate before sim
        ethics = ethics_review_hypothesis(hypothesis)
        if not ethics.approved:
            raise HTTPException(status_code=403, detail="Ethics gate failed")
        return run_simulation(hypothesis)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/validate", response_model=ValidationResult)
def validate(sim_result: SimulationResult):
    try:
        # Results criteria gate (mock: always pass if p<0.05)
        result = validate_experiment(sim_result)
        if not result.meets_criteria:
            raise HTTPException(status_code=400, detail="Results do not meet criteria")
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/learn")
def learn(validation: ValidationResult):
    try:
        return update_model(validation)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ethics-check", response_model=EthicsCheck)
def ethics_check(content: str):  # Generic for data/hyp
    try:
        score = check_data_quality(content, {"provenance": "user"})
        approved = score > 0.5
        issues = ["low_quality"] if not approved else []
        return EthicsCheck(issues=issues, approved=approved)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Full flow endpoint (for demo)
@app.post("/full-flow")
def run_full_flow(topic: str):
    try:
        # Stage 1
        ingest_input = IngestionInput(topic=topic)
        data = ingest_and_curate(ingest_input)
        # Stage 2
        entities = model_knowledge(data)
        # Stage 3
        hyps_response = hypothesize(entities, topic)
        hyps = hyps_response["hypotheses"]
        if not hyps:
            raise HTTPException(status_code=403, detail="No approved hypotheses")
        hyp = hyps[0]  # Take first
        # Stage 4
        sim = run_simulation(hyp)
        if not sim.ethics_passed:
            raise HTTPException(status_code=403, detail="Simulation ethics failed")
        # Stage 5
        val = validate(sim)
        # Stage 6
        learn_result = update_model(val)
        return {
            "data": data,
            "entities": entities,
            "hypotheses": hyps,
            "simulation": sim,
            "validation": val,
            "learning": learn_result
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
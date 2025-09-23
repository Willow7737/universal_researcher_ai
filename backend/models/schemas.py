from pydantic import BaseModel
from typing import List, Optional, Dict
from enum import Enum

class DataSource(str, Enum):
    PAPER = "paper"
    PATENT = "patent"
    DATASET = "dataset"
    FORUM = "forum"

class IngestionInput(BaseModel):
    topic: str
    sources: List[DataSource] = [DataSource.PAPER]

class CuratedData(BaseModel):
    content: str
    metadata: Dict[str, str]  # e.g., {"provenance": "arXiv", "license": "CC-BY"}
    quality_score: float  # 0-1 after checks

class KnowledgeEntity(BaseModel):
    entity: str
    relation: str
    evidence_score: float

class Hypothesis(BaseModel):
    statement: str
    plausibility: float
    design: Dict[str, str]  # e.g., {"protocol": "...", "materials": "..."}

class SimulationResult(BaseModel):
    output: Dict[str, float]  # e.g., {"energy": 42.0}
    score: float  # Novelty/risk/cost
    ethics_passed: bool

class ValidationResult(BaseModel):
    data: Dict[str, float]  # e.g., {"p_value": 0.05, "effect_size": 0.8}
    meets_criteria: bool

class EthicsCheck(BaseModel):
    issues: List[str]  # e.g., ["bias_detected", "pii_found"]
    approved: bool
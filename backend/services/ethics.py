import re
from models.schemas import CuratedData, dict  # Hypothesis/Sim

PII_PATTERNS = [r'\b[A-Z][a-z]+ [A-Z][a-z]+\b', r'\d{3}-\d{2}-\d{4}']  # Names/SSN mock
BIAS_KEYWORDS = ['discriminatory', 'biased', 'harmful']

def check_data_quality(content: str, metadata: dict) -> float:
    issues = 0
    for pattern in PII_PATTERNS:
        if re.search(pattern, content):
            issues += 1
    for kw in BIAS_KEYWORDS:
        if kw in content.lower():
            issues += 1
    # Provenance/license check
    if "license" not in metadata or metadata["provenance"] == "unknown":
        issues += 1
    return max(0, 1 - (issues / 3))  # Score 0-1

def ethics_review_hypothesis(hyp: dict) -> dict:
    issues = []
    if any(kw in hyp["design"]["protocol"].lower() for kw in BIAS_KEYWORDS):
        issues.append("bias_detected")
    if "dangerous" in hyp["statement"].lower():  # Safety
        issues.append("safety_risk")
    approved = len(issues) == 0
    return {"issues": issues, "approved": approved}

# Similar for sim/validation gates
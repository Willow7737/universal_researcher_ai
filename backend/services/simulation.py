import numpy as np
from models.schemas import dict  # From Hypothesis

def run_simulation(hypothesis: dict) -> dict:
    # Mock domain sim (e.g., simple physics: $F = ma$, but rule-based)
    if "energy" in hypothesis["design"]["protocol"]:
        sim_output = {"energy": np.random.normal(50, 10)}  # Gaussian sim
    else:
        sim_output = {"growth_rate": np.exp(-0.1 * np.random.rand())}  # Bio mock
    # Score: Value (novelty=0.8), risk=0.2, cost=0.5
    score = (0.8 - 0.2 + 0.5) / 3
    ethics_passed = True  # Call ethics.py in real
    return {"output": sim_output, "score": score, "ethics_passed": ethics_passed}
from scipy import stats
from models.schemas import SimulationResult

def validate_experiment(sim_result: SimulationResult) -> dict:
    # Mock lab data capture (e.g., sensors → stats)
    observed = np.random.normal(sim_result.output.get("energy", 50), 5, 100)
    expected = sim_result.output.get("energy", 50)
    t_stat, p_value = stats.ttest_1samp(observed, expected)
    effect_size = abs(np.mean(observed) - expected) / np.std(observed)
    # Criteria: p < 0.05, power > 0.8 (mock power calc)
    meets_criteria = p_value < 0.05 and effect_size > 0.5
    return {
        "data": {"p_value": p_value, "effect_size": effect_size},
        "meets_criteria": meets_criteria
    }
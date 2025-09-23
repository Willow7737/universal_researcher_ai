from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from models.schemas import KnowledgeEntity
from services.ethics import ethics_review_hypothesis

llm = OpenAI(temperature=0.7)  # Requires OPENAI_API_KEY

template = PromptTemplate(
    input_variables=["entities", "topic"],
    template="Based on entities {entities} for topic {topic}, generate 3 plausible hypotheses with experimental designs. Include safety notes."
)

def generate_hypotheses(entities: List[KnowledgeEntity], topic: str) -> List[dict]:
    prompt = template.format(entities=str([e.entity for e in entities]), topic=topic)
    response = llm(prompt)
    # Mock parsing (real: use structured output)
    hypotheses = [
        {"statement": f"Hypothesis 1: {topic} leads to X.", "plausibility": 0.8, "design": {"protocol": "Test A", "materials": "Basic"}},
        {"statement": f"Hypothesis 2: {topic} via Y.", "plausibility": 0.6, "design": {"protocol": "Test B", "materials": "Advanced"}},
        {"statement": f"Hypothesis 3: Analogy to Z.", "plausibility": 0.9, "design": {"protocol": "Sim first", "materials": "Safe"}}
    ]
    filtered = [h for h in hypotheses if ethics_review_hypothesis(h).approved]
    return filtered
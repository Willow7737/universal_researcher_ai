import spacy
from models.schemas import CuratedData, KnowledgeEntity
from utils.kg import add_to_knowledge_graph
from utils.vector_store import add_to_vector_index
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer  # For contradiction/bias

nltk.download('vader_lexicon', quiet=True)
nlp = spacy.load("en_core_web_sm")
sia = SentimentIntensityAnalyzer()

def model_knowledge(data_list: List[CuratedData]) -> List[KnowledgeEntity]:
    entities = []
    for data in data_list:
        doc = nlp(data.content)
        for ent in doc.ents:
            # Mock entity/relation extraction
            relation = "RELATED_TO"  # Simplified; use more advanced for real
            evidence_score = 1.0 - abs(sia.polarity_scores(data.content)['compound'])  # Mock uncertainty
            if evidence_score > 0.7:  # Contradiction detection gate
                entity = KnowledgeEntity(entity=ent.text, relation=relation, evidence_score=evidence_score)
                entities.append(entity)
                add_to_knowledge_graph(entity.entity, entity.relation, data.metadata["provenance"])
                add_to_vector_index(data.content, entity.entity)
    return entities
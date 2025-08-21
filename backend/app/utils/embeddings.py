# Embedding wrapper: uses sentence-transformers if available, otherwise TF-IDF fallback.
try:
    from sentence_transformers import SentenceTransformer
    _HAS_SBT = True
except Exception:
    _HAS_SBT = False

from typing import List
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

class EmbeddingService:
    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        self.model_name = model_name
        if _HAS_SBT:
            self.model = SentenceTransformer(model_name)
        else:
            self.model = None
            self._tfidf = TfidfVectorizer(max_features=384)

    def encode(self, texts: List[str]):
        if self.model is not None:
            vecs = self.model.encode(texts, show_progress_bar=False)
            return np.array(vecs).astype('float32')
        # fallback TF-IDF
        X = self._tfidf.fit_transform(texts)
        return X.toarray().astype('float32')


from qdrant_client import QdrantClient
from qdrant_client.http import models as rest
from typing import List, Dict
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
import os

class _TfidfEmbedder:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(max_features=384)

    def fit(self, texts: List[str]):
        self.vectorizer.fit(texts)

    def encode(self, texts: List[str]):
        if not hasattr(self.vectorizer, 'vocabulary_') or self.vectorizer.vocabulary_ is None:
            self.fit(texts)
        X = self.vectorizer.transform(texts)
        return X.toarray().astype('float32')

class VectorClient:
    def __init__(self, host: str = "localhost", port: int = 6333, collection: str = "documents"):
        self.client = QdrantClient(host=host, port=port)
        self.collection = collection
        self.embedder = _TfidfEmbedder()
        self._ensure_collection()

    def _ensure_collection(self):
        try:
            self.client.get_collection(self.collection)
        except Exception:
            self.client.recreate_collection(
                collection_name=self.collection,
                vectors_config=rest.VectorParams(size=384, distance=rest.Distance.COSINE)
            )

    def upsert(self, items: List[Dict]):
        texts = [it["text"] for it in items]
        vecs = self.embedder.encode(texts)
        points = []
        for i, it in enumerate(items):
            points.append(
                rest.PointStruct(
                    id=it["id"],
                    vector=vecs[i].tolist(),
                    payload=it.get("metadata", {})
                )
            )
        self.client.upsert(collection_name=self.collection, points=points)

    def search(self, query: str, limit: int = 5):
        qvec = self.embedder.encode([query])[0].tolist()
        hits = self.client.search(collection_name=self.collection, query_vector=qvec, limit=limit)
        results = []
        for h in hits:
            results.append({
                "id": h.id,
                "score": h.score,
                "metadata": h.payload
            })
        return results


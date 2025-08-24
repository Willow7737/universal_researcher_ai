from qdrant_client import QdrantClient
from qdrant_client.http import models as rest
from qdrant_client.http.exceptions import UnexpectedResponse
from typing import List, Dict
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer


class _TfidfEmbedder:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(max_features=384)

    def fit(self, texts: List[str]):
        self.vectorizer.fit(texts)

    def encode(self, texts: List[str]):
        if not hasattr(self.vectorizer, "vocabulary_") or self.vectorizer.vocabulary_ is None:
            self.fit(texts)
        X = self.vectorizer.transform(texts)
        return X.toarray().astype("float32")


class VectorClient:
    def __init__(
        self,
        url: str = None,
        host: str = None,
        port: int = None,
        collection: str = "documents",
        api_key: str = None,
    ):
        if url:  # Qdrant Cloud
            self.client = QdrantClient(url=url, api_key=api_key)
        else:  # Local/self-hosted
            self.client = QdrantClient(host=host, port=port, api_key=api_key)

        self.collection = collection
        self.embedder = _TfidfEmbedder()
        self._ensure_collection()

    def _ensure_collection(self):
        """
        Make sure the collection exists.
        On Qdrant Cloud, recreate_collection is forbidden, so we only create if missing.
        """
        try:
            self.client.get_collection(self.collection)
        except UnexpectedResponse as e:
            if "not found" in str(e).lower():
                self.client.create_collection(
                    collection_name=self.collection,
                    vectors_config=rest.VectorParams(size=384, distance=rest.Distance.COSINE),
                )
            else:
                raise
        except Exception:
            # fallback: try to create if any other issue suggests missing collection
            try:
                self.client.create_collection(
                    collection_name=self.collection,
                    vectors_config=rest.VectorParams(size=384, distance=rest.Distance.COSINE),
                )
            except Exception:
                # If it still fails, re-raise to avoid silent errors
                raise

    def upsert(self, items: List[Dict]):
        texts = [it["text"] for it in items]
        vecs = self.embedder.encode(texts)
        points = []
        for i, it in enumerate(items):
            points.append(
                rest.PointStruct(
                    id=it["id"],
                    vector=vecs[i].tolist(),
                    payload=it.get("metadata", {}),
                )
            )
        self.client.upsert(collection_name=self.collection, points=points)

    def search(self, query: str, limit: int = 5):
        qvec = self.embedder.encode([query])[0].tolist()
        hits = self.client.search(
            collection_name=self.collection,
            query_vector=qvec,
            limit=limit,
        )
        results = []
        for h in hits:
            results.append({"id": h.id, "score": h.score, "metadata": h.payload})
        return results

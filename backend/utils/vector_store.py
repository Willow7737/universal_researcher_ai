import faiss
import numpy as np
from sentence_transformers import SentenceTransformer  # Add 'sentence-transformers==2.2.2' to requirements.txt if not already

model = SentenceTransformer('all-MiniLM-L6-v2')
index = faiss.IndexFlatL2(384)  # Dimension for MiniLM embeddings
documents = []

def add_to_vector_index(content: str, entity: str):
    embedding = model.encode([content])
    index.add(np.array(embedding).astype('float32'))
    documents.append({"content": content, "entity": entity})

def retrain_index():
    # Rebuild FAISS index from scratch (for learning loop)
    global index, documents
    if documents:
        embeddings = model.encode([doc["content"] for doc in documents])
        index = faiss.IndexFlatL2(384)
        index.add(np.array(embeddings).astype('float32'))
        print("Vector index retrained.")
    else:
        print("No documents to retrain.")
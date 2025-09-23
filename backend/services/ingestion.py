import arxiv
from models.schemas import IngestionInput, CuratedData, DataSource
from utils.provenance import track_provenance
from services.ethics import check_data_quality
import re  # For basic dedup/normalization

def ingest_and_curate(input: IngestionInput) -> List[CuratedData]:
    results = []
    if DataSource.PAPER in input.sources:
        # Mock arXiv ingestion
        search = arxiv.Search(query=input.topic, max_results=5)
        for result in search.results():
            content = result.summary  # Simplified: real would use PDF→text/OCR
            # Normalization: Basic text clean
            content = re.sub(r'\s+', ' ', content).strip()
            metadata = {
                "title": result.title,
                "provenance": "arXiv",
                "license": "arXiv license",
                "url": result.entry_id
            }
            # Dedup: Skip if duplicate (mock)
            if len(results) > 0 and results[-1].content == content:
                continue
            quality_score = check_data_quality(content, metadata)
            if quality_score > 0.5:  # Gate
                tracked = track_provenance(content, metadata)
                results.append(CuratedData(content=tracked["content"], metadata=tracked["metadata"], quality_score=quality_score))
    return results
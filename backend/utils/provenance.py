from typing import Dict
import hashlib
import json

def track_provenance(content: str, metadata: Dict[str, str]) -> Dict:
    # Generate hash for reproducibility
    content_hash = hashlib.sha256(content.encode()).hexdigest()[:8]
    tracked_metadata = metadata.copy()
    tracked_metadata["hash"] = content_hash
    tracked_metadata["timestamp"] = "2023-10-01T00:00:00Z"  # Use real datetime in prod
    # Log to file or DB (mock: return)
    provenance_log = {
        "content": content,
        "metadata": tracked_metadata
    }
    # In real: append to JSON log file
    with open("provenance_log.json", "a") as f:
        json.dump(provenance_log, f)
        f.write("\n")
    return provenance_log
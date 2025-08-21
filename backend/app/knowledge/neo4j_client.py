from neo4j import GraphDatabase
import os

class Neo4jClient:
    def __init__(self):
        uri = os.getenv("NEO4J_URI", "bolt://neo4j:7687")
        user = os.getenv("NEO4J_USER", "neo4j")
        password = os.getenv("NEO4J_PASSWORD", "neo4j")
        try:
            self.driver = GraphDatabase.driver(uri, auth=(user, password))
        except Exception as e:
            self.driver = None

    def create_document_node(self, doc_id: str, title: str, source: str, url: str = ""):
        if not self.driver:
            return
        with self.driver.session() as session:
            session.execute_write(self._create_document_node_tx, doc_id, title, source, url)

    @staticmethod
    def _create_document_node_tx(tx, doc_id: str, title: str, source: str, url: str):
        tx.run(
            """MERGE (d:Document {id: $doc_id})
                SET d.title = $title, d.source = $source, d.url = $url
            """, doc_id=doc_id, title=title, source=source, url=url
        )


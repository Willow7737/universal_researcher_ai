from neo4j import GraphDatabase
import os
from dotenv import load_dotenv

load_dotenv()
driver = GraphDatabase.driver(os.getenv("NEO4J_URI"), auth=(os.getenv("NEO4J_USER"), os.getenv("NEO4J_PASSWORD")))

def add_to_knowledge_graph(entity: str, relation: str, provenance: str):
    with driver.session() as session:
        session.run("CREATE (a:Entity {name: $entity}) -[:REL {type: $relation, provenance: $prov}]->(b:Entity {name: $target})", 
                    entity=entity, relation=relation, prov=provenance, target="target")  # Mock target

def update_knowledge_graph(key: str, data: dict):
    with driver.session() as session:
        session.run("MERGE (n:Evidence {key: $key}) SET n.data = $data", key=key, data=str(data))
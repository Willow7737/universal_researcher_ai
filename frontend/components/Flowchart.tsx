import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1. Ingestion & Curation' }, type: 'input' },
  { id: '2', position: { x: 250, y: 0 }, data: { label: '2. Knowledge Modeling' } },
  { id: '3', position: { x: 500, y: 0 }, data: { label: '3. Hypothesis & Design' } },
  { id: '4', position: { x: 750, y: 0 }, data: { label: '4. Simulation & Prioritization' } },
  { id: '5', position: { x: 1000, y: 0 }, data: { label: '5. Real-World Validation' } },
  { id: '6', position: { x: 1250, y: 0 }, data: { label: '6. Learning Loop & Dissemination' } },
  // Ethics gates
  { id: 'e1', position: { x: 625, y: 100 }, data: { label: 'Ethics/Safety Gate' }, type: 'output' },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e4-e1', source: '4', target: 'e1' },
  { id: 'e1-5', source: 'e1', target: '5' },
  { id: 'e5-6', source: '5', target: '6' },
];

export default function Flowchart() {
  return (
    <div style={{ height: 500, width: '100%' }} className="bg-white rounded-lg shadow">
      <ReactFlow nodes={initialNodes} edges={initialEdges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
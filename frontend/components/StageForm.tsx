import { useState } from 'react';

interface Props {
  topic: string;
  setTopic: (topic: string) => void;
  onRun: () => void;
  loading: boolean;
}

export default function StageForm({ topic, setTopic, onRun, loading }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Start Research</h2>
      <input
        type="text"
        placeholder="Enter research topic (e.g., 'climate change models')"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={onRun}
        disabled={!topic || loading}
        className="w-full bg-research-blue text-white py-2 px-4 rounded disabled:opacity-50"
      >
        {loading ? 'Running...' : 'Run Full Flow'}
      </button>
      <p className="text-sm text-gray-600 mt-2">
        This will process through all 6 stages: Ingestion, Modeling, Hypothesis, Simulation, Validation, and Learning.
    </div>
  );
} 6 stages: Ingestion, Modeling, Hypothesis, Simulation, Validation, and Learning.
      </p>
    </div>
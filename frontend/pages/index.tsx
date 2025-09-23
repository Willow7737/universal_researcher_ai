import { useState } from 'react';
import Flowchart from '../components/Flowchart';
import StageForm from '../components/StageForm';
import { fullFlow } from '../lib/api';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleRunFlow = async () => {
    setLoading(true);
    try {
      const response = await fullFlow(topic);
      setResults(response.data);
    } catch (error) {
      console.error('Error running flow:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-research-blue mb-8">Universal Researcher AI</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <StageForm topic={topic} setTopic={setTopic} onRun={handleRunFlow} loading={loading} />
            {results && (
              <div className="mt-4 p-4 bg-white rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">Results</h2>
                <pre className="text-sm overflow-auto">{JSON.stringify(results, null, 2)}</pre>
              </div>
            )}
          </div>
          <Flowchart />
        </div>
      </div>
    </div>
  );
}
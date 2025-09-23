import { useRouter } from 'next/router';
import ResultsViewer from '../components/ResultsViewer';

export default function Results() {
  const router = useRouter();
  const { data } = router.query;  // Pass results via query or state in real

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Research Results</h1>
        <ResultsViewer data={data || {}} />
      </div>
    </div>
  );
}
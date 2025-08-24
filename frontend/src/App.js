import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ResearchQuery from './pages/ResearchQuery';
import ErrorBoundary from './components/ErrorBoundary';

function Protected({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

// Function to keep backend warm
const keepBackendWarm = () => {
  setInterval(async () => {
    try {
      await fetch('https://universal-researcher-ai.onrender.com/system/health');
      console.log('Backend health check - keeping warm');
    } catch (error) {
      console.log('Health check failed, backend might be spinning down');
    }
  }, 4 * 60 * 1000); // Ping every 4 minutes (less than Render's 5-minute timeout)
};

function App() {
  useEffect(() => {
    // Start keeping backend warm when app loads
    keepBackendWarm();
  }, []);

  const token = localStorage.getItem('token');
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
          <Route path="/research" element={<Protected><ResearchQuery /></Protected>} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;

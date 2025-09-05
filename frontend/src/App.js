import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import your pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ResearchQuery from './pages/ResearchQuery';
import UraLandingPage from './pages/UraLandingPage'; // <-- Import the landing page
import ErrorBoundary from './components/ErrorBoundary';

// This component remains the same
function Protected({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

// This function remains the same
const keepBackendWarm = () => {
  setInterval(async () => {
    try {
      await fetch('https://universal-researcher-ai.onrender.com/system/health');
      console.log('Backend health check - keeping warm');
    } catch (error) {
      console.log('Health check failed, backend might be spinning down');
    }
  }, 4 * 60 * 1000);
};

function App() {
  useEffect(() => {
    keepBackendWarm();
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/*
            CHANGE 1: The root path now renders your landing page.
            The old logic that checked for a token is no longer needed here.
          */}
          <Route path="/" element={<UraLandingPage />} />

          {/* CHANGE 2: Add a dedicated route for the landing page itself */}
          <Route path="/welcome" element={<UraLandingPage />} />
          
          <Route path="/login" element={<Login />} />
          
          <Route 
            path="/dashboard" 
            element={<Protected><Dashboard /></Protected>} 
          />
          <Route 
            path="/research" 
            element={<Protected><ResearchQuery /></Protected>} 
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;

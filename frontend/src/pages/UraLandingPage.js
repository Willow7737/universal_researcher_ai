import React from 'react';
import { Link } from 'react-router-dom';

// SVG Icon Components
const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M2 7L12 12M12 22V12M22 7L12 12M17 4.5L7 9.5" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);

const DecorativeIcon1 = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/><path d="M24 32L16 24L24 16L32 24L24 32Z" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/><path d="M32 32L24 24L32 16" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/><path d="M16 32L24 24L16 16" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/></svg>
);

const DecorativeIcon2 = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#A7C4F4" strokeWidth="2" strokeLinejoin="round"/><path d="M12 16L12 12M12 8L12 8.01" stroke="#A7C4F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);


function UraLandingPage() {
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    :root {
      --bg-color: #3A476A;
      --card-bg: #FFFFFF;
      --primary-accent: #8FAADC;
      --secondary-accent: #A7C4F4;
      --text-dark: #2D3748;
      --text-light: #FFFFFF;
      --btn-bg: #2D3748;
      --btn-hover: #4A5568;
    }

    body {
      background-color: var(--bg-color);
      font-family: 'Inter', sans-serif;
      color: var(--text-light);
      margin: 0;
      padding: 2rem;
      overflow-x: hidden;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
    }

    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      font-size: 1rem;
    }

    .nav-links a {
      color: var(--text-light);
      text-decoration: none;
      transition: opacity 0.3s;
    }

    .nav-links a:hover {
      opacity: 0.8;
    }

    .signup-btn {
      background-color: transparent;
      border: 1px solid var(--secondary-accent);
      color: var(--text-light);
      padding: 0.5rem 1.5rem;
      border-radius: 9999px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .signup-btn:hover {
      background-color: rgba(167, 196, 244, 0.1);
    }

    /* Main Content */
    .main-content {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 2rem;
      margin-top: 3rem;
      align-items: start;
    }

    /* Left Column Decorative Cards */
    .left-column {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
        position: relative;
        top: -2rem;
    }

    .card {
        background-color: var(--card-bg);
        color: var(--text-dark);
        border-radius: 20px;
        padding: 1.5rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .card-large {
        grid-column: 1 / -1;
        grid-row: 1 / 3;
        background: url('https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop') center/cover;
        min-height: 300px;
    }
    
    .card-medium {
        background-color: var(--primary-accent);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .card-small {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        text-align: center;
    }
    
    .card-small-icon { font-size: 2.5rem; }
    .card-small p { margin: 0; font-weight: 500; }

    /* Right Column Hero Section */
    .right-column {
      background-color: rgba(255, 255, 255, 0.05);
      border-radius: 30px;
      padding: 4rem;
      backdrop-filter: blur(10px);
    }

    .hero-title {
      font-size: 4rem;
      font-weight: 700;
      line-height: 1.1;
      margin: 0;
    }

    .hero-subtitle {
      font-size: 1.125rem;
      max-width: 450px;
      margin: 1.5rem 0 2rem;
      line-height: 1.6;
      color: var(--secondary-accent);
    }

    .cta-container {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .cta-btn {
      background-color: var(--btn-bg);
      color: var(--text-light);
      padding: 1rem 2rem;
      border: none;
      border-radius: 9999px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .cta-btn:hover {
      background-color: var(--btn-hover);
    }
    
    /* Roadmap Section */
    .roadmap-section {
        background-color: #000;
        color: var(--text-light);
        border-radius: 20px;
        margin-top: 2rem;
        padding: 2.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .roadmap-content {
        max-width: 50%;
    }
    .roadmap-badge {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--primary-accent);
        margin-bottom: 1rem;
    }
    .roadmap-title {
        font-size: 2rem;
        font-weight: 600;
        margin: 0;
    }
    .roadmap-image {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop') center/cover;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .main-content {
        grid-template-columns: 1fr;
      }
      .left-column {
        grid-template-columns: repeat(3, 1fr);
        top: 0;
        margin-bottom: 2rem;
      }
      .card-large {
        grid-column: 1 / 3;
        grid-row: 1 / 2;
      }
    }
    
    @media (max-width: 768px) {
      body { padding: 1rem; }
      .header { flex-direction: column; gap: 1rem; }
      .nav-links { display: none; } /* Hide for simplicity on mobile */
      .right-column { padding: 2rem; }
      .hero-title { font-size: 2.5rem; }
      .left-column { grid-template-columns: 1fr 1fr; }
      .card-large { grid-column: 1 / -1; }
      .roadmap-section { flex-direction: column; text-align: center; gap: 1.5rem; }
      .roadmap-content { max-width: 100%; }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="container">
        <header className="header">
          <div className="logo">
            <LogoIcon />
            <span>Universal Researcher AI</span>
          </div>
          <nav className="nav-links">
            <a href="#roadmap">Roadmap</a>
            <a href="#architecture">Architecture</a>
            <a href="#funding">Funding</a>
          </nav>
          <Link to="/login">
            <button className="signup-btn">Login / Get Started</button>
          </Link>
        </header>

        <main className="main-content">
          <div className="left-column">
            <div className="card card-large"></div>
            <div className="card card-medium">
                 <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 3.5C14.5 3.5 15.5 6.5 17.5 8.5C19.5 10.5 22.5 11.5 22.5 11.5M14.5 3.5L11.5 1.5L9.5 3.5L11.5 5.5L14.5 3.5Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M11.5 12.5C11.5 12.5 10.5 9.5 8.5 7.5C6.5 5.5 3.5 4.5 3.5 4.5M11.5 12.5L14.5 14.5L12.5 16.5L9.5 14.5L11.5 12.5Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.5 11.5C3.5 11.5 6.5 12.5 8.5 14.5C10.5 16.5 11.5 19.5 11.5 19.5M3.5 11.5L1.5 14.5L3.5 16.5L5.5 14.5L3.5 11.5Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12.5 11.5C12.5 11.5 15.5 10.5 17.5 8.5C19.5 6.5 20.5 3.5 20.5 3.5M12.5 11.5L14.5 9.5L16.5 11.5L14.5 13.5L12.5 11.5Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="card card-small">
              <div className="card-small-icon">📊</div>
              <p>Knowledge Modeling</p>
            </div>
          </div>

          <div className="right-column">
            <h1 className="hero-title">Universal Researcher AI</h1>
            <p className="hero-subtitle">
              An AI platform to ingest data, generate hypotheses, design experiments, and accelerate scientific discovery.
            </p>
            <div className="cta-container">
              <Link to="/login">
                <button className="cta-btn">JOIN COMMUNITY</button>
              </Link>
              <DecorativeIcon1 />
              <DecorativeIcon2 />
            </div>
          </div>
        </main>
        
        <section id="roadmap" className="roadmap-section">
            <div className="roadmap-content">
                <p className="roadmap-badge">PROJECT ROADMAP</p>
                <h2 className="roadmap-title">Charting the Course for Autonomous Science</h2>
            </div>
            <div className="roadmap-image"></div>
        </section>
      </div>
    </>
  );
}

export default UraLandingPage;

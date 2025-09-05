import React from 'react';
// Import 'Link' to handle navigation
import { Link } from 'react-router-dom';

// ... (your SVG icon components can remain here)
const LogoIcon = () => ( /* ... icon svg ... */ );
const DecorativeIcon1 = () => ( /* ... icon svg ... */ );
const DecorativeIcon2 = () => ( /* ... icon svg ... */ );


function UraLandingPage() {
  const css = `
    /* ... (all your CSS styles from before remain unchanged) ... */
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
    
    /* ... etc. ... */
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
          {/* CHANGE 3: Wrap the button in a Link component that points to '/login'.
            This makes the button a clickable navigation element.
          */}
          <Link to="/login">
            <button className="signup-btn">Login / Get Started</button>
          </Link>
        </header>

        <main className="main-content">
          {/* ... (your left column code) ... */}
          <div className="left-column">
              {/* ... cards ... */}
          </div>

          <div className="right-column">
            <h1 className="hero-title">Universal Researcher AI</h1>
            <p className="hero-subtitle">
              An AI platform to ingest data, generate hypotheses, design experiments, and accelerate scientific discovery.
            </p>
            <div className="cta-container">
              {/*
                CHANGE 4: Also wrap the main CTA button in a Link to the login page.
              */}
              <Link to="/login">
                <button className="cta-btn">JOIN COMMUNITY</button>
              </Link>
              <DecorativeIcon1 />
              <DecorativeIcon2 />
            </div>
          </div>
        </main>
        
        <section id="roadmap" className="roadmap-section">
            {/* ... (your roadmap section code) ... */}
        </section>
      </div>
    </>
  );
}

export default UraLandingPage;


import React from "react";
import { Link } from "react-router-dom";

/**
 * UraLandingPage.jsx
 * - An elegant, refined landing page for the Universal Researcher AI.
 * - Evokes themes of clarity, growth, and sophisticated intelligence.
 * - Full component + scoped CSS string (easy drop-in).
 */

/* --- Minimal icon set (inline SVGs) --- */
const IconIngest = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12H9L12 18L15 6L18 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconModel = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 19V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M5 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M22 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M17.6568 6.34315L19.7782 4.22173" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M4.22173 19.7782L6.34315 17.6568" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M17.6568 17.6568L19.7782 19.7782" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M4.22173 4.22173L6.34315 6.34315" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IconHypothesis = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 14V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M2 12H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
const IconSimulate = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 10H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M7 14H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IconValidate = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconLearn = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 16V12L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* --- Component --- */
export default function UraLandingPage() {
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@800&display=swap');

    :root {
      --bg: #f8f9fc;
      --surface: #ffffff;
      --primary: #2d3748; /* Dark Slate */
      --muted: #5a677d;
      --border-color: rgba(45, 55, 72, 0.1);
      --accent-start: #4FD1C5; /* Teal */
      --accent-end: #667eea; /* Indigo */
      --radius: 16px;
      --shadow-sm: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
      --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02);
      --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      background: var(--bg);
      font-family: 'Inter', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: var(--primary);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }
    
    .ura-wrapper {
      max-width: 1280px;
      margin: 64px auto;
      padding: 0 32px;
    }

    /* --- Header --- */
    .ura-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 96px;
    }
    .brand {
      display: flex;
      gap: 16px;
      align-items: center;
      text-decoration: none;
      color: var(--primary);
    }
    .brand .logo {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--accent-start), var(--accent-end));
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 800;
      font-size: 1.2rem;
      font-family: 'Playfair Display', serif;
    }
    .brand .title {
      font-size: 1.25rem;
      font-weight: 700;
    }
    .nav-actions { display: flex; gap: 12px; align-items: center; }
    .nav-links a {
      color: var(--muted);
      text-decoration: none;
      font-weight: 500;
      padding: 8px 12px;
      border-radius: 8px;
      transition: color 0.2s ease, background-color 0.2s ease;
    }
    .nav-links a:hover {
      color: var(--primary);
      background-color: rgba(45, 55, 72, 0.05);
    }
    .btn {
      border-radius: 999px;
      padding: 12px 24px;
      border: 1px solid transparent;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease-in-out;
    }
    .btn-primary {
      background: linear-gradient(95deg, var(--accent-start), var(--accent-end));
      color: white;
      box-shadow: var(--shadow-sm);
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    .btn-outline {
      background: transparent;
      color: var(--primary);
      border-color: var(--border-color);
    }
    .btn-outline:hover {
      background: var(--surface);
      border-color: var(--primary);
    }

    /* --- Hero --- */
    .hero {
      text-align: center;
      margin-bottom: 96px;
    }
    .hero h1 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2.5rem, 6vw, 4rem);
      margin: 0 auto 16px auto;
      color: var(--primary);
      line-height: 1.1;
      max-width: 800px;
      background: linear-gradient(120deg, var(--accent-start) 20%, var(--accent-end) 80%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero p.lead {
      margin: 0 auto 32px auto;
      color: var(--muted);
      max-width: 720px;
      font-size: clamp(1rem, 2vw, 1.125rem);
      line-height: 1.6;
    }
    .hero-ctas { display: flex; gap: 16px; justify-content: center; }
    .hero-figure {
      width: 100%;
      height: 400px;
      border-radius: var(--radius);
      margin-top: 64px;
      background-image: url('https://images.unsplash.com/photo-1535402636653-f7e9034989e7?q=80&w=2070&auto=format&fit=crop');
      background-size: cover;
      background-position: center;
      box-shadow: var(--shadow-lg);
    }

    /* --- Sections --- */
    .section { margin-bottom: 80px; }
    .section-header {
      text-align: center;
      margin-bottom: 48px;
    }
    .section-header h2 {
      margin: 0 0 8px 0;
      font-family: 'Playfair Display', serif;
      font-size: 2rem;
      color: var(--primary);
    }
    .section-header p {
      margin: 0;
      color: var(--muted);
      font-size: 1.1rem;
    }

    /* --- How It Works --- */
    .process-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
    }
    .process-card {
      background: var(--surface);
      border-radius: var(--radius);
      padding: 24px;
      border: 1px solid var(--border-color);
      display: flex;
      gap: 20px;
      align-items: flex-start;
      box-shadow: var(--shadow-sm);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .process-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
    }
    .process-card .icon {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent-end);
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(79, 209, 197, 0.1));
      border-radius: 12px;
      flex-shrink: 0;
    }
    .process-card h4 {
      margin: 0 0 8px 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--primary);
    }
    .process-card p {
      margin: 0;
      color: var(--muted);
      font-size: 0.95rem;
      line-height: 1.5;
    }

    /* --- Governance --- */
    .governance-card {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 48px;
      align-items: center;
      padding: 48px;
      background: var(--surface);
      border-radius: var(--radius);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-md);
    }
    .badge-group { display: flex; flex-direction: column; gap: 16px; align-items: flex-start; }
    .badge {
      background: var(--bg);
      border-radius: 8px;
      padding: 10px 16px;
      border: 1px solid var(--border-color);
      color: var(--primary);
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .gov-list p { margin: 0; color: var(--muted); font-size: 1rem; line-height: 1.6; }
    .gov-list p + p { margin-top: 12px; }

    /* --- Roadmap --- */
    .roadmap-timeline {
      max-width: 800px;
      margin: 0 auto;
      position: relative;
    }
    .timeline-item {
      display: flex;
      gap: 24px;
      position: relative;
      padding-bottom: 48px;
    }
    .timeline-item:not(:last-child)::before {
      content: '';
      position: absolute;
      left: 11px;
      top: 12px;
      width: 2px;
      height: 100%;
      background: var(--border-color);
    }
    .timeline-dot {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--bg);
      border: 2px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      z-index: 1;
    }
    .timeline-dot .inner-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent-start), var(--accent-end));
    }
    .milestone h5 { margin: 0; color: var(--primary); font-size: 1.1rem; }
    .milestone p { margin: 4px 0 0 0; color: var(--muted); font-size: 0.95rem; }
    
    /* --- Footer CTA --- */
    .cta-footer {
      margin-top: 64px;
      background: linear-gradient(120deg, #2D3748, #1A202C);
      color: white;
      border-radius: var(--radius);
      padding: 48px;
      text-align: center;
    }
    .cta-footer h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.8rem;
      margin: 0 0 12px 0;
    }
    .cta-footer p {
      color: rgba(255, 255, 255, 0.8);
      max-width: 600px;
      margin: 0 auto 24px auto;
    }
    .cta-footer .footer-actions { display: flex; gap: 16px; justify-content: center; }

    /* --- Responsive --- */
    @media (max-width: 980px) {
      .ura-wrapper { margin: 48px auto; }
      .nav-links { display: none; }
    }
    @media (max-width: 768px) {
      .governance-card { grid-template-columns: 1fr; gap: 32px; padding: 32px; }
      .hero-ctas, .footer-actions { flex-direction: column; align-items: center; }
      .ura-wrapper { padding: 0 24px; }
    }
  `;

  const steps = [
    {
      key: "ingest",
      title: "Ingestion & Curation",
      description: "Source discovery from literature, patents, datasets, and forums, followed by normalization and provenance checks.",
      Icon: IconIngest,
    },
    {
      key: "model",
      title: "Knowledge Modeling",
      description: "Entity extraction to build a unified knowledge graph, with contradiction detection and evidence scoring.",
      Icon: IconModel,
    },
    {
      key: "hypothesis",
      title: "Hypothesis Generation",
      description: "LLM and symbolic reasoning generate novel hypotheses and experimental designs with safety constraints.",
      Icon: IconHypothesis,
    },
    {
      key: "simulate",
      title: "Simulation & Prioritization",
      description: "Domain-specific simulations score hypotheses for novelty, risk, and cost, with an automated ethics triage.",
      Icon: IconSimulate,
    },
    {
      key: "validate",
      title: "Real-world Validation",
      description: "Pre-registration and IP checks precede execution in partnered labs with traceable data capture.",
      Icon: IconValidate,
    },
    {
      key: "learn",
      title: "Learning & Dissemination",
      description: "Results update the knowledge base and retrain models, with transparent reporting and artifact release.",
      Icon: IconLearn,
    },
  ];

  const roadmap = [
    { year: "2025 Q4", note: "Production ingestion & knowledge graph deployment." },
    { year: "2026 Q2", note: "Launch of hypothesis generator & simulation suite." },
    { year: "2026 Q4", note: "Lab integration & automated validation pilot programs." },
    { year: "2027", note: "Establishment of open consortium for replication & governance." },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="ura-wrapper" role="main">
        <header className="ura-header" role="banner">
          <a className="brand" href="/" aria-label="Universal Researcher AI home">
            <div className="logo" aria-hidden="true">R</div>
            <div className="title">Researcher AI</div>
          </a>

          <div className="nav-actions" role="navigation" aria-label="Primary">
            <nav className="nav-links">
              <a href="#pipeline">Pipeline</a>
              <a href="#governance">Governance</a>
              <a href="#roadmap">Roadmap</a>
            </nav>
            <Link to="/signup" className="btn btn-primary">Get Started</Link>
          </div>
        </header>

        <main>
          <section className="hero" aria-labelledby="hero-title">
            <h1 id="hero-title">From Data to Discovery, Accelerated.</h1>
            <p className="lead">
              An end-to-end platform for governed, reproducible science. We operationalize the research lifecycle — from ingestion and hypothesis to simulation and real-world validation.
            </p>
            <div className="hero-ctas">
              <Link to="/signup" className="btn btn-primary">Request Early Access</Link>
              <a href="#pipeline" className="btn btn-outline">Explore the Pipeline</a>
            </div>
            <div className="hero-figure" role="img" aria-label="Abstract glowing network of data points"></div>
          </section>

          <section id="pipeline" className="section" aria-labelledby="pipeline-title">
            <div className="section-header">
              <h2 id="pipeline-title">The URA Pipeline</h2>
              <p>A six-stage process with integrated governance checkpoints.</p>
            </div>
            <div className="process-grid" role="list">
              {steps.map((s) => (
                <article className="process-card" key={s.key} role="listitem" aria-labelledby={`${s.key}-title`}>
                  <div className="icon" aria-hidden="true"><s.Icon /></div>
                  <div>
                    <h4 id={`${s.key}-title`}>{s.title}</h4>
                    <p>{s.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="governance" className="section" aria-labelledby="gov-title">
            <div className="section-header">
              <h2 id="gov-title">Designed for Trust & Reproducibility</h2>
              <p>Built-in controls to ensure responsible, transparent science.</p>
            </div>
            <div className="governance-card" role="complementary">
              <div className="badge-group">
                <div className="badge">Ethical Gating</div>
                <div className="badge">Immutable Provenance</div>
                <div className="badge">Replication Packages</div>
              </div>
              <div className="gov-list">
                <p><strong>Policy-First Design:</strong> Automated biosafety, PII, and IP checks are enforced before any simulation or experiment.</p>
                <p><strong>End-to-End Traceability:</strong> Immutable metadata and integration with ELN/LIMS create a verifiable audit trail for every discovery.</p>
              </div>
            </div>
          </section>

          <section id="roadmap" className="section" aria-labelledby="roadmap-title">
            <div className="section-header">
              <h2 id="roadmap-title">Our Roadmap</h2>
              <p>Key milestones on our journey to democratize discovery.</p>
            </div>
            <div className="roadmap-timeline" role="list">
              {roadmap.map((m, i) => (
                <div className="timeline-item" key={i} role="listitem">
                  <div className="timeline-dot" aria-hidden="true"><div className="inner-dot"></div></div>
                  <div className="milestone">
                    <h5>{m.year}</h5>
                    <p>{m.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
        
        <footer className="cta-footer" role="contentinfo">
          <h3>Begin Your Next Chapter of Research</h3>
          <p>Onboard your institution and empower your teams with the future of scientific workflow automation. Early access and strategic partnerships are now available.</p>
          <div className="footer-actions">
            <Link to="/signup" className="btn btn-primary">Request Early Access</Link>
            <Link to="/contact" className="btn btn-outline" style={{color:"white", borderColor:"rgba(255,255,255,0.2)"}}>Contact Sales</Link>
          </div>
        </footer>
      </div>
    </>
  );
}

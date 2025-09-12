import React from "react";
import { Link } from "react-router-dom";

/**
 * UraLandingPageMinimal.jsx
 * - Minimal, research-grade landing page for Universal Researcher AI
 * - Full component + scoped CSS string (easy drop-in)
 * - Replace image URLs and routing targets as desired
 */

/* --- Minimal icon set (inline SVGs) --- */
const IconIngest = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M3 12h6l3 6 3-12 3 6h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconModel = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M12 3v3M12 18v3M4.2 6.2l2.1 2.1M17.7 15.7l2.1 2.1M4.2 17.8l2.1-2.1M17.7 8.3l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconHypothesis = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);
const IconSimulate = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 10h10M7 14h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);
const IconValidate = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconLearn = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M3 12h18M12 3v18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* --- Component --- */
export default function UraLandingPageMinimal() {
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Merriweather:wght@600;700&display=swap');

    :root{
      --bg: #ffffff;
      --surface: #ffffff;
      --primary: #0b2d4a; /* deep navy */
      --accent: #2a8f9f;  /* muted teal */
      --muted: #6b7280;   /* charcoal gray for copy */
      --card: #f6f8fa;
      --glass: rgba(11,45,74,0.04);
      --radius: 12px;
    }

    *{box-sizing: border-box}
    body{
      margin:0;
      background: var(--bg);
      font-family: 'Inter', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
      color: var(--primary);
      -webkit-font-smoothing:antialiased;
      -moz-osx-font-smoothing:grayscale;
    }

    .ura-wrapper{
      max-width: 1200px;
      margin: 48px auto;
      padding: 0 24px;
    }

    /* Header */
    .ura-header{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:16px;
      margin-bottom:36px;
    }
    .brand {
      display:flex;
      gap:14px;
      align-items:center;
      text-decoration:none;
      color:var(--primary);
    }
    .brand .logo {
      width:48px;
      height:48px;
      border-radius:10px;
      background:linear-gradient(180deg, rgba(42,143,159,0.12), rgba(11,45,74,0.06));
      display:flex;
      align-items:center;
      justify-content:center;
      color:var(--primary);
      font-weight:700;
      font-family: 'Merriweather', serif;
    }
    .brand .title {
      font-size:1.125rem;
      font-weight:700;
      font-family: 'Merriweather', serif;
    }
    .nav-actions {
      display:flex;
      gap:12px;
      align-items:center;
    }
    .nav-links a {
      color:var(--muted);
      text-decoration:none;
      font-weight:500;
      margin-right:14px;
    }
    .btn {
      border-radius:999px;
      padding:10px 18px;
      border:1px solid transparent;
      font-weight:600;
      cursor:pointer;
      text-decoration:none;
      display:inline-flex;
      align-items:center;
      gap:8px;
    }
    .btn-primary {
      background:var(--primary);
      color:#fff;
      border-color:var(--primary);
    }
    .btn-outline {
      background:transparent;
      color:var(--primary);
      border-color:var(--glass);
    }

    /* Hero */
    .hero {
      display:grid;
      grid-template-columns: 1fr 420px;
      gap:32px;
      align-items:center;
      margin-bottom:48px;
    }
    .hero-left h1 {
      font-family: 'Merriweather', serif;
      font-size:2.25rem;
      margin:0 0 12px 0;
      color:var(--primary);
      line-height:1.08;
    }
    .hero-left p.lead {
      margin:0 0 22px 0;
      color:var(--muted);
      max-width:680px;
      font-size:1rem;
      line-height:1.6;
    }
    .hero-ctas {
      display:flex;
      gap:12px;
    }
    .hero-right {
      background:var(--card);
      border-radius:var(--radius);
      padding:22px;
      box-shadow: 0 6px 20px rgba(11,45,74,0.06);
      text-align:center;
    }
    .hero-figure {
      width:100%;
      height:220px;
      border-radius:8px;
      background-image: url('https://images.unsplash.com/photo-1526378723976-0e4f7ed6a0d8?q=80&w=1770&auto=format&fit=crop');
      background-size:cover;
      background-position:center;
      margin-bottom:12px;
      filter:grayscale(8%) contrast(95%);
    }
    .hero-right p {
      margin:0;
      color:var(--muted);
      font-size:0.95rem;
    }

    /* How it works */
    .section {
      margin-bottom:40px;
    }
    .section .section-header {
      display:flex;
      justify-content:space-between;
      align-items:end;
      gap:12px;
      margin-bottom:18px;
    }
    .section .section-header h3 {
      margin:0;
      font-family:'Merriweather', serif;
      font-size:1.125rem;
      color:var(--primary);
    }
    .process-grid {
      display:grid;
      grid-template-columns: repeat(3, 1fr);
      gap:18px;
    }
    .process-card {
      background:var(--surface);
      border-radius:10px;
      padding:18px;
      border:1px solid var(--glass);
      display:flex;
      gap:12px;
      align-items:flex-start;
      min-height:110px;
    }
    .process-card .icon {
      width:48px;
      height:48px;
      display:flex;
      align-items:center;
      justify-content:center;
      color:var(--primary);
      flex-shrink:0;
    }
    .process-card h4 {
      margin:0 0 6px 0;
      font-size:1rem;
      color:var(--primary);
    }
    .process-card p {
      margin:0;
      color:var(--muted);
      font-size:0.92rem;
      line-height:1.45;
    }

    /* Governance */
    .governance {
      display:flex;
      gap:18px;
      align-items:center;
      justify-content:space-between;
      padding:18px;
      background:linear-gradient(180deg, rgba(42,143,159,0.04), rgba(11,45,74,0.02));
      border-radius:12px;
      border:1px solid var(--glass);
    }
    .governance .cols { display:flex; gap:24px; align-items:center; }
    .badge {
      background:#fff;
      border-radius:8px;
      padding:12px 14px;
      box-shadow: 0 6px 18px rgba(11,45,74,0.04);
      border:1px solid var(--glass);
      color:var(--primary);
      font-weight:600;
    }
    .gov-list p { margin:0; color:var(--muted); font-size:0.95rem; }

    /* Roadmap */
    .roadmap {
      margin-top:18px;
      display:flex;
      gap:18px;
      align-items:flex-start;
    }
    .timeline {
      flex:1;
      background:transparent;
    }
    .timeline .milestone {
      display:flex;
      gap:12px;
      margin-bottom:18px;
      align-items:flex-start;
    }
    .timeline .dot {
      width:12px;
      height:12px;
      border-radius:50%;
      background:var(--accent);
      margin-top:6px;
      flex-shrink:0;
    }
    .milestone h5 { margin:0; color:var(--primary); font-size:0.99rem; }
    .milestone p { margin:4px 0 0 0; color:var(--muted); font-size:0.9rem; }

    /* Footer CTA */
    .cta-footer {
      margin-top:36px;
      background:var(--primary);
      color:#fff;
      border-radius:12px;
      padding:22px;
      display:flex;
      justify-content:space-between;
      align-items:center;
      gap:16px;
    }
    .cta-footer p { margin:0; font-weight:600; }
    .cta-footer .footer-actions { display:flex; gap:12px; }

    /* Responsive */
    @media (max-width: 980px){
      .hero { grid-template-columns: 1fr; }
      .process-grid { grid-template-columns: repeat(2, 1fr); }
      .hero-right { order: -1; }
    }
    @media (max-width: 640px){
      .process-grid { grid-template-columns: 1fr; }
      .ura-wrapper{ margin:28px auto; padding:0 16px; }
      .governance { flex-direction:column; align-items:flex-start; }
      .cta-footer { flex-direction:column; align-items:flex-start; }
    }
  `;

  /* Process steps derived and summarized from your flowchart */
  const steps = [
    {
      key: "ingest",
      title: "Ingestion & Curation",
      bullets: [
        "Source discovery: literature, patents, datasets, forums.",
        "Normalization (OCR, metadata extraction), provenance & license checks."
      ],
      Icon: IconIngest,
    },
    {
      key: "model",
      title: "Knowledge Modeling",
      bullets: [
        "Entity/relation extraction, unified ontology, knowledge graph + vector index.",
        "Contradiction detection with evidence scoring and uncertainty measures."
      ],
      Icon: IconModel,
    },
    {
      key: "hypothesis",
      title: "Hypothesis & Experimental Design",
      bullets: [
        "LLM + symbolic reasoning to generate hypotheses and constrained priors.",
        "Automatic protocol generator with safety and material constraints."
      ],
      Icon: IconHypothesis,
    },
    {
      key: "simulate",
      title: "Simulation & Prioritization",
      bullets: [
        "Domain-specific simulations (physics, chem, bio) to score novelty, risk, cost.",
        "Automated ethics & safety triage before real-world steps."
      ],
      Icon: IconSimulate,
    },
    {
      key: "validate",
      title: "Real-world Validation",
      bullets: [
        "Pre-registration, IP/biosafety checks, partnered lab execution.",
        "Traceable data capture (ELN/LIMS), rigorous statistical analysis."
      ],
      Icon: IconValidate,
    },
    {
      key: "learn",
      title: "Learning Loop & Dissemination",
      bullets: [
        "Update knowledge base, retrain models, replicate & release artifacts.",
        "Transparent reporting: preprints, reproducible artifacts, roadmap iteration."
      ],
      Icon: IconLearn,
    },
  ];

  const roadmap = [
    { year: "2025 Q4", note: "Production ingestion & knowledge graph" },
    { year: "2026 Q2", note: "Hypothesis generator + simulation suite" },
    { year: "2026 Q4", note: "Lab integration & automated validation pilots" },
    { year: "2027", note: "Open consortium for external replication & governance" },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="ura-wrapper" role="main" aria-labelledby="ura-title">
        <header className="ura-header" role="banner">
          <a className="brand" href="/" aria-label="Universal Researcher AI home">
            <div className="logo" aria-hidden>URA</div>
            <div className="title">Universal Researcher AI</div>
          </a>

          <div className="nav-actions" role="navigation" aria-label="Primary">
            <nav className="nav-links" aria-hidden>
              <a href="#how" >How it works</a>
              <a href="#governance">Governance</a>
              <a href="#roadmap">Roadmap</a>
            </nav>
            <div>
              <Link to="/whitepaper" className="btn btn-outline" aria-label="Read whitepaper">Whitepaper</Link>
              <Link to="/signup" className="btn btn-primary" style={{marginLeft:8}} aria-label="Get started">Get started</Link>
            </div>
          </div>
        </header>

        {/* HERO */}
        <section className="hero" aria-labelledby="ura-title">
          <div className="hero-left">
            <h1 id="ura-title">Ingest data. Generate knowledge. Accelerate discovery.</h1>
            <p className="lead">
              Universal Researcher AI operationalizes scientific workflows end-to-end: from provenance-aware ingestion
              to hypothesis generation, prioritized simulation, and validated real-world experiments — governed by
              reproducibility and safety-first controls.
            </p>
            <div className="hero-ctas" role="region" aria-label="Primary calls to action">
              <Link to="/signup" className="btn btn-primary">Join researchers</Link>
              <a href="#how" className="btn btn-outline">Explore process</a>
            </div>
          </div>

          <aside className="hero-right" aria-labelledby="hero-right-title">
            <div className="hero-figure" role="img" aria-label="Abstract knowledge graph illustration"></div>
            <p id="hero-right-title">
              Production-ready architecture that emphasizes traceability, reproducible artifacts, and governed
              experimental workflows — designed for institutional adoption.
            </p>
          </aside>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="section" aria-labelledby="how-title">
          <div className="section-header">
            <h3 id="how-title">How it works — the URA pipeline</h3>
            <small style={{color:"var(--muted)"}}>Six operational stages with integrated governance checkpoints</small>
          </div>

          <div className="process-grid" role="list" aria-label="Process steps">
            {steps.map((s) => (
              <article className="process-card" key={s.key} role="listitem" aria-labelledby={`${s.key}-title`}>
                <div className="icon" aria-hidden><s.Icon /></div>
                <div>
                  <h4 id={`${s.key}-title`}>{s.title}</h4>
                  <p>
                    {s.bullets.map((b, idx) => (
                      <span key={idx} style={{display:"block"}}>• {b}</span>
                    ))}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* GOVERNANCE & SAFETY */}
        <section id="governance" className="section" aria-labelledby="gov-title">
          <div className="section-header">
            <h3 id="gov-title">Governance, Ethics & Reproducibility</h3>
            <small style={{color:"var(--muted)"}}>Built-in controls to ensure responsible science</small>
          </div>

          <div className="governance" role="complementary">
            <div className="cols">
              <div className="badge">Ethics Gate</div>
              <div className="badge">Provenance</div>
              <div className="badge">Reproducibility</div>
            </div>

            <div className="gov-list">
              <p><strong>Policy-first design:</strong> Automated biosafety & PII filters, IP checks, and pre-registration enforcement.</p>
              <p style={{marginTop:6}}><strong>Traceability:</strong> End-to-end ELN/LIMS integration, immutable metadata, artifact packaging for replication.</p>
            </div>
          </div>
        </section>

        {/* ROADMAP */}
        <section id="roadmap" className="section" aria-labelledby="roadmap-title">
          <div className="section-header">
            <h3 id="roadmap-title">Roadmap</h3>
            <small style={{color:"var(--muted)"}}>Milestones & commercial adoption timeline</small>
          </div>

          <div className="roadmap">
            <div className="timeline" aria-hidden>
              {roadmap.map((m, i) => (
                <div className="milestone" key={i}>
                  <div className="dot" aria-hidden></div>
                  <div>
                    <h5>{m.year} — {m.note}</h5>
                    <p style={{marginTop:6, color:"var(--muted)"}}>{i===0 ? "Deliver core ingestion, KG, and initial validation pipelines." : ""}</p>
                  </div>
                </div>
              ))}
            </div>

            <aside style={{width:300}}>
              <div style={{background:"var(--card)", padding:16, borderRadius:10, border:"1px solid var(--glass)"}}>
                <h4 style={{margin:"0 0 8px 0", color:"var(--primary)"}}>Strategic partnerships</h4>
                <p style={{margin:0, color:"var(--muted)"}}>We will onboard select research institutions and lab partners for early validation and real-world trials.</p>
              </div>
            </aside>
          </div>
        </section>

        {/* CTA FOOTER */}
        <footer className="cta-footer" role="contentinfo" aria-label="Call to action">
          <div>
            <p>Be part of the next chapter in reproducible, governed scientific discovery.</p>
            <div style={{color:"rgba(255,255,255,0.8)", fontSize:"0.92rem", marginTop:6}}>Early access & institutional partnerships available.</div>
          </div>
          <div className="footer-actions">
            <Link to="/contact" className="btn btn-outline" style={{color:"#fff", borderColor:"rgba(255,255,255,0.16)"}}>Contact sales</Link>
            <Link to="/signup" className="btn btn-primary">Request early access</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
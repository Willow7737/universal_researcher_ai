import React from 'react';

export default function CardResult({item}){
  const meta = item.metadata || {};
  const title = meta.title || item.id;
  const snippet = (meta.snippet) ? meta.snippet : (meta.text ? meta.text.slice(0,200) : "");
  const score = (item.score || 0).toFixed ? (item.score).toFixed(4) : item.score;
  return (
    <div className="card result">
      <div className="score">{score}</div>
      <h3>{title}</h3>
      <p>{snippet}</p>
      <div className="meta">source: {meta.source || "unknown"} | id: {item.id}</div>
    </div>
  )
}


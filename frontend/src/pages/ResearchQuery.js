import React, {useState} from 'react';
import axios from '../api';
import CardResult from '../components/CardResult';
import { Link } from 'react-router-dom';

export default function ResearchQuery(){
  const [q, setQ] = useState('catalyst for CO2');
  const [results, setResults] = useState([]);

  async function doQuery(e){
    e && e.preventDefault();
    setResults([]);
    try{
      const r = await axios.post('/research/query', { q }, { headers: { Authorization:`Bearer ${localStorage.getItem('token')}` } });
      setResults(r.data.results || []);
    }catch(e){
      alert(e.response?.data?.detail || e.message);
    }
  }

  return (
    <div className="layout">
      <nav className="topnav">
        <div><Link to="/dashboard">URAID Dashboard</Link></div>
        <div><Link to="/research">Research</Link> | <a href="#" onClick={()=>{localStorage.removeItem('token'); window.location='/login';}}>Logout</a></div>
      </nav>
      <main>
        <h1>Research Query</h1>
        <form onSubmit={doQuery} className="card row">
          <input value={q} onChange={e=>setQ(e.target.value)} style={{flex:1}}/>
          <button>Search</button>
        </form>

        <div className="results">
          {results.length===0 && <div className="card">No results. Try seeding demo from backend: POST /research/seed_demo</div>}
          {results.map(r=> <CardResult key={r.id} item={r} />)}
        </div>
      </main>
    </div>
  )
}


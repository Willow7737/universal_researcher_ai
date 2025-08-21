import React, {useEffect, useState} from 'react';
import axios from '../api';
import AdminUsers from './AdminUsers';
import { Link } from 'react-router-dom';

export default function Dashboard(){
  const [health, setHealth] = useState({});
  useEffect(()=>{ fetchHealth(); }, []);
  async function fetchHealth(){
    try{
      const r = await axios.get('/system/health', { headers: {...(axios.defaults.headers || {}), ...((localStorage.getItem('token'))?{Authorization:`Bearer ${localStorage.getItem('token')}`}:{})} });
      setHealth(r.data);
    }catch(e){
      setHealth({error: e.message});
    }
  }
  return (
    <div className="layout">
      <nav className="topnav">
        <div>URAID Dashboard</div>
        <div>
          <Link to="/research">Research</Link> | <a href="#" onClick={()=>{localStorage.removeItem('token'); window.location='/login';}}>Logout</a>
        </div>
      </nav>
      <main>
        <h1>System Health</h1>
        <pre>{JSON.stringify(health, null, 2)}</pre>
        <AdminUsers/>
      </main>
    </div>
  )
}


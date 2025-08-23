import React, { useEffect, useState } from 'react';
import axios from '../api';
import AdminUsers from './AdminUsers';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [health, setHealth] = useState({});
  const nav = useNavigate();

  useEffect(() => { fetchHealth(); }, []);

  async function fetchHealth() {
    try {
      const r = await axios.get('/system/health', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setHealth(r.data);
    } catch (e) {
      setHealth({ error: e.response?.data?.detail || e.message });
    }
  }

  function logout(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    nav('/login');
  }

  return (
    <div className="layout">
      <nav className="topnav">
        <div>URAID Dashboard</div>
        <div>
          <Link to="/research">Research</Link> |{" "}
          <a href="#" onClick={logout}>Logout</a>
        </div>
      </nav>
      <main>
        <h1>System Health</h1>
        <pre>{JSON.stringify(health, null, 2)}</pre>
        <AdminUsers />
      </main>
    </div>
  )
}

import React, { useState } from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const r = await axios.post(
  '/auth/login',
  { username, password },
  { headers: { 'Content-Type': 'application/json' } }
);
      localStorage.setItem('token', r.data.access_token);
      nav('/dashboard');
    } catch (e) {
      const msg = e.response?.data?.detail || e.message || 'Login failed';
      setErr(typeof msg === 'string' ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="center">
      <form className="card" onSubmit={submit}>
        <h2>Login</h2>
        {err && <div className="err">{typeof err === 'string' ? err : JSON.stringify(err)}</div>}
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="username" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
        <button disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      </form>
    </div>
  )
}

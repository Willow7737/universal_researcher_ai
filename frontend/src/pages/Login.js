import React, {useState} from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [err, setErr] = useState(null);
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try{
      const r = await axios.post('/auth/login', { username, password });
      localStorage.setItem('token', r.data.access_token);
      nav('/dashboard');
    }catch(e){
      setErr(e.response?.data?.detail || e.message);
    }
  }

  return (
    <div className="center">
      <form className="card" onSubmit={submit}>
        <h2>Login</h2>
        {err && <div className="err">{err}</div>}
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" />
        <button>Login</button>
      </form>
    </div>
  )
}


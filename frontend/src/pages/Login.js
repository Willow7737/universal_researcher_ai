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
      const response = await axios.post('/auth/login', { username, password });
      
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        
        // Set default authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
        
        nav('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.code === 'ECONNABORTED') {
        setErr('Request timeout. Please try again.');
      } else if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;
        
        if (status === 422) {
          setErr('Invalid request format. Please contact support.');
        } else if (status === 401) {
          setErr('Invalid username or password.');
        } else {
          setErr(data.detail || `Server error: ${status}`);
        }
      } else if (error.request) {
        // Request made but no response received
        setErr('Network error. Please check your connection.');
      } else {
        setErr('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="center">
      <form className="card" onSubmit={submit}>
        <h2>Login</h2>
        {err && <div className="err">{err}</div>}
        <input 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          placeholder="username" 
          required
        />
        <input 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="password" 
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

import React, { useState } from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isWakingUp, setIsWakingUp] = useState(false);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    setIsWakingUp(false);
    
    // Set a timeout to show "waking up" message if it takes too long
    const wakeUpTimer = setTimeout(() => {
      setIsWakingUp(true);
    }, 5000);
    
    try {
      const response = await axios.post('/auth/login', { username, password });
      
      clearTimeout(wakeUpTimer);
      
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        
        // Set default authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
        
        nav('/dashboard');
      }
    } catch (error) {
      clearTimeout(wakeUpTimer);
      console.error('Login error:', error);
      
      if (error.code === 'ECONNABORTED') {
        setErr('Server is taking longer than expected to respond. Please try again in a moment.');
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
        setErr('Network error. Please check your connection and try again.');
      } else {
        setErr('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
      setIsWakingUp(false);
    }
  }

  return (
    <div className="center">
      <form className="card" onSubmit={submit}>
        <h2>Login</h2>
        {err && <div className="err">{err}</div>}
        {isWakingUp && (
          <div className="info">
            <p>Server is waking up... This might take a moment.</p>
            <p>Please be patient or try again in a few seconds.</p>
          </div>
        )}
        <input 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          placeholder="username" 
          required
          disabled={loading}
        />
        <input 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="password" 
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <div style={{marginTop: '1rem', fontSize: '0.8rem', color: '#666'}}>
          <p>Note: The server may take 30-60 seconds to wake up on first request.</p>
        </div>
      </form>
    </div>
  );
}

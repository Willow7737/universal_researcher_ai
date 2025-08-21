import React, {useEffect, useState} from 'react';
import axios from '../api';

export default function AdminUsers(){
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('newuser');
  const [password, setPassword] = useState('pass');
  const [role, setRole] = useState('user');

  useEffect(()=>{ fetchUsers(); }, []);

  async function fetchUsers(){
    try{
      const r = await axios.get('/admin/users', { headers: {...(axios.defaults.headers || {}), Authorization:`Bearer ${localStorage.getItem('token')}`} });
      setUsers(r.data);
    }catch(e){
      console.error(e);
    }
  }
  async function addUser(e){
    e.preventDefault();
    try{
      await axios.post('/admin/users', { username, password, role }, { headers: { Authorization:`Bearer ${localStorage.getItem('token')}` } });
      fetchUsers();
    }catch(e){
      alert(e.response?.data?.detail || e.message);
    }
  }

  return (
    <div className="card">
      <h3>Users</h3>
      <form onSubmit={addUser} className="row">
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" />
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value="user">user</option>
          <option value="admin">admin</option>
          <option value="service">service</option>
        </select>
        <button>Add</button>
      </form>
      <table className="users">
        <thead><tr><th>ID</th><th>Username</th><th>Role</th><th>Created</th></tr></thead>
        <tbody>
          {users.map(u=> <tr key={u.id}><td>{u.id}</td><td>{u.username}</td><td>{u.role}</td><td>{u.created_at}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}


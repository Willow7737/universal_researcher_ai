import axios from 'axios';
const API = process.env.REACT_APP_API_URL || "http://localhost:8000";
export function authHeaders(){
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}
export default axios.create({ baseURL: API });


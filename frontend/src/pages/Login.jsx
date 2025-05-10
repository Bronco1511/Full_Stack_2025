import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/auth/login', { username, password });
      console.log("Login response:", res.data); // Debug log

      if (res.data.success && res.data.token) {
        localStorage.setItem('token', res.data.token); // Save token
        navigate('/dashboard'); // Redirect
      } else {
        alert('Login failed. Invalid credentials or missing token.');
      }
    } catch (err) {
      console.error('Login error:', err); // Log error
      alert('Login error: could not connect to server.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px' }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;


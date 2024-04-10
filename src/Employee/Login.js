import React, { useState } from 'react';
import '../css/Login.css'; 
import axios from 'axios';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'a' && password === '325') {
      onLogin();
    } else {
      alert('Invalid credentials');
    }
  };
  
 

  return (
    
    <div className="login-box">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="user-box">
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="login-input" required />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" required />
          <label>Password</label>
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;

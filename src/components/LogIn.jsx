import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '/src/api.js'

function LogIn({ onSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      if (response.data.success === 200) {
        const {token, message} = response.data;
        onSignIn(token);
        console.log(message);
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login');
    }
  };

  return (
    <div className="container text-center">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3 w-100">Log In</button>
      </form>
      <div className="mt-3">
        <Link to="/forgot-password">Zapomniałem hasła</Link>
      </div>
    </div>
  );
}

export default LogIn;

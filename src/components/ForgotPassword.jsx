import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleReset = (event) => {
    event.preventDefault();
    // Logika resetowania hasła
    console.log('Resetowanie hasła dla:', email);
    alert("Link do resetowania hasła został wysłany!");
  };

  return (
    <div className="container text-center">
      <h1>Reset Password</h1>
      <form onSubmit={handleReset} className="mt-3">
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
        <button type="submit" className="btn btn-primary mt-3 w-100">Reset Password</button>
      </form>
      <div className="mt-3">
        <Link to="/login">Powrót do logowania</Link>
      </div>
    </div>
  );
}

export default ForgotPassword;

import React, { useState } from 'react';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Logika rejestracji
    console.log('Rejestracja:', { email, password });
  };

  return (
    <div className="container text-center">
      <h1>Sign Up</h1>
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
        <div className="form-group mt-3">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="confirmPassword" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3 w-100">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;

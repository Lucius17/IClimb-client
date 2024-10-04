import React from 'react';
import { Link } from 'react-router-dom';

function Unsigned() {
  return (
    <div className="container text-center">
      <h1>IClimb</h1>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Link to="/login" className="btn btn-primary mb-3 w-100">Sign In</Link>
      <Link to="/signup" className="btn btn-secondary w-100">Sign Up</Link>
      <Link to="/superadmin" className="btn btn-secondary w-100">AdminPanel</Link>
      <Link to="/news" className="btn btn-secondary w-100">News</Link>
      
    </div>
  );
}

export default Unsigned;

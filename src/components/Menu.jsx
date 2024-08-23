import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    
    <div className="fixed-bottom bg-light">
    
      <div className="d-flex justify-content-around">
        <Link to="/" className="btn btn-primary w-100 text-center">Home</Link>
        <Link to="/gym" className="btn btn-primary w-100 text-center">Gym</Link>
        <Link to="/profile" className="btn btn-primary w-100 text-center">Profile</Link>
      </div>
    </div>
  );
}

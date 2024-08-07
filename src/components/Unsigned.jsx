import React from 'react';

function Unsigned({ onSignIn, onSignUp }) {
  return (
    <div className="container text-center">
      <h1>IClimb</h1>
      <br />
      <br />
      <br />
      <br />
      <br />
      <button 
        className="btn btn-primary mb-3 w-100" 
        onClick={onSignIn}
        type="button"
      >
        Sign In
      </button>
      <button 
        className="btn btn-secondary w-100" 
        onClick={onSignUp}
        type="button"
      >
        Sign Up
      </button>
    </div>
  );
}

export default Unsigned;

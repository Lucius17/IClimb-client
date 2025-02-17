import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '/src/api.js';  // Ensure this path is correct
import Menu from './Menu';

function Unsigned() {
    const [gymId, setGymId] = useState(null);

    useEffect(() => {
        const fetchUserGym = async () => {
            try {
                const response = await api.get('/auth/me');
                if (response.data?.gym?._id) {
                    setGymId(response.data.gym._id);
                }
            } catch (error) {
                console.error('Failed to fetch gym ID:', error);
            }
        };

        fetchUserGym();
    }, []);
  
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
        {gymId ? (
            <Link to={`/news/${gymId}`} className="btn btn-secondary w-100">News</Link>
        ) : (
            <button className="btn btn-secondary w-100" disabled>No Gym Selected</button>
        )}
      <Link to="/wall/1" className="btn btn-secondary w-100">ścianka</Link>
      

      <Menu />
    </div>
  );
}

export default Unsigned;

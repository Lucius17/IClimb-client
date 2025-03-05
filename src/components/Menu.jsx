import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper,faDumbbell,faUser, faN } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import api from '/src/api.js'


export default function Menu() {
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

    <div className="fixed-bottom">
    
      <div className="d-flex justify-content-around">
      {gymId ? (
            <Link to={`/news/${gymId}`} className="btn btn-primary w-100"><FontAwesomeIcon icon={faNewspaper } />{}</Link>
        ) : (
            <button className="btn btn-primary w-100" disabled>No Gym Selected</button>
        )}
        <Link to="/gym" className="btn btn-primary w-100 text-center"><FontAwesomeIcon icon={faDumbbell} /></Link>
        <Link to="/profile" className="btn btn-primary w-100 text-center"><FontAwesomeIcon icon={faUser} /></Link>
      </div>
    </div>
  );
}

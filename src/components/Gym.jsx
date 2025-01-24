import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import api from '/src/api.js';
import Menu from './Menu';
import MapView from './MapView';

function Gym() {
  const [gymId, setGymId] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/auth/me');
        if (response.data) {
          if (response.data.gym?._id) {
            setGymId(response.data.gym._id);
          } else {
            setGymId('No gym selected');
          }
        } else {
          console.error('No user data returned from API');
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!loading && gymId !== 'No gym selected' && gymId) {
      navigate(`/sectors/${gymId}`);
    }
  }, [gymId, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (gymId === 'No gym selected') {
    return (
      <>
        <MapView />
        <Menu />
      </>
    );
  }

  // Gdy gymId jest ustawione, następuje przekierowanie w useEffect, więc ten fragment nie będzie używany.
  return null;
}

export default Gym;

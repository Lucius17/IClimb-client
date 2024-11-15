import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '/src/api.js';

function SuperAdminPanel() {
  const [sportsCenters, setSportsCenters] = useState([]);
  const [newCenterName, setNewCenterName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch gyms from backend (optional, if needed for initial loading)
  const fetchGyms = async () => {
    try {
      const response = await api.get('/gyms/gym');
      setSportsCenters(response.data);
    } catch (err) {
      console.error('Error fetching gyms:', err);
      setError('Failed to load gyms.');
    }
  };
  fetchGyms()
  const handleAddCenter = async () => {
    if (newCenterName.trim() === '') {
      setError('Gym name cannot be empty.');
      return;
    }
    try {
      const response = await api.post('/gyms/gym', { name: newCenterName });
      setSportsCenters([...sportsCenters, response.data]);
      setNewCenterName('');
      setError('');
      setSuccess('Gym added successfully.');
    } catch (err) {
      console.error('Error adding gym:', err);
      setError('Failed to add gym.');
    }
  };

  const handleDeleteCenter = async (id) => {
    try {
      await api.delete(`/gyms/gym/${id}`);
      setSportsCenters(sportsCenters.filter(center => center._id !== id));
      setSuccess('Gym deleted successfully.');
    } catch (err) {
      console.error('Error deleting gym:', err);
      setError('Failed to delete gym.');
    }
  };

  return (
      <div className="container">
        <h1 className="my-4">Managing Climbing Gyms</h1>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <ul className="list-group mb-4">
          {sportsCenters.map(center => (
              <li key={center._id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{center.name}</span>
                <div>
                  <Link to={`/admin/${center._id}/dashboard`} className="btn btn-primary mr-2">
                    Manage
                  </Link>
                  <button className="btn btn-danger" onClick={() => handleDeleteCenter(center._id)}>
                    Delete
                  </button>
                </div>
              </li>
          ))}
        </ul>

        <div className="form-group">
          <label>Add New Climbing Gym</label>
          <input
              type="text"
              className="form-control"
              value={newCenterName}
              onChange={(e) => setNewCenterName(e.target.value)}
          />
          <button className="btn btn-success mt-2" onClick={handleAddCenter}>
            Add Gym
          </button>
        </div>
      </div>
  );
}

export default SuperAdminPanel;

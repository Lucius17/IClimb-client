import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import api from '/src/api.js';
import Users from './Users';
import { Modal, Button } from 'react-bootstrap';

function Gyms() {
  const [sportsCenters, setSportsCenters] = useState([]);
  const [newCenterName, setNewCenterName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ email: '', password: '' });

  const fetchGyms = async () => {
    try {
      const response = await api.get('/gyms/gym');
      setSportsCenters(response.data);
    } catch (err) {
      console.error('Error fetching gyms:', err);
      setError('Failed to load gyms.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin({ ...newAdmin, [name]: value });
  };

  const handleAddAdmin = () => {
    if (NewAdmin.email && NewAdmin.password) {
      setModerators([
        ...moderators,
        { id: Date.now().toString(), ...NewAdmin },
      ]);
      setNewAdmin({ email: '', password: '' });
      setShowAddModal(false);
    }
  };


  useEffect(() => {
    fetchGyms();
  }, []);

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
      <div>
        <h2>Zarządzanie Obiektami Sportowymi</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <ul className="list-group mb-4">
          {sportsCenters.map(center => (
              <li key={center._id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{center.name}</span>
                <div>
                  <Link to={`/admin/${center._id}/dashboard`} className="btn btn-primary mr-2">Zarządzaj</Link>
                  <button className="btn btn-danger" onClick={() => handleDeleteCenter(center._id)}>Usuń</button>
                </div>
              </li>
          ))}
        </ul>

        <div className="form-group">
          <label>Dodaj Nowy Obiekt Sportowy</label>
          <input
              type="text"
              className="form-control"
              value={newCenterName}
              onChange={(e) => setNewCenterName(e.target.value)}
          />
          <button className="btn btn-success mt-2" onClick={handleAddCenter}>Dodaj Obiekt</button>
        </div>

        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={newAdmin.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={newAdmin.password}
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddAdmin}>
            Add Moderator
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
  );
}

function SuperAdminPanel() {
  const location = useLocation();
  const isGymsActive = location.pathname.includes('gyms');
  const isUsersActive = location.pathname.includes('users');

  return (
      <div className="container">
        <h1 className="my-4">Super Admin Panel</h1>
        <nav>
          <Link to="/superadmin/gyms" className={`btn ${isGymsActive ? 'btn-primary' : 'btn-secondary'} m-2`}>Gyms</Link>
          <Link to="/superadmin/users" className={`btn ${isUsersActive ? 'btn-primary' : 'btn-secondary'} m-2`}>Users</Link>
        </nav>

        <Routes>
          <Route path="gyms" element={<Gyms />} />
          <Route path="users" element={<Users />} />
        </Routes>
      </div>
  );
}

export default SuperAdminPanel;

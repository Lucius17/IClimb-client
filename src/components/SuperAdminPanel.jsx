// SuperAdminPanel.jsx
import React, { useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Users from './Users';

function Gyms() {
  const [sportsCenters, setSportsCenters] = useState([
    { id: 1, name: 'Centrum Wspinaczki 1' },
    { id: 2, name: 'Centrum Wspinaczki 2' },
  ]);
  const [newCenterName, setNewCenterName] = useState('');

  const handleAddCenter = () => {
    if (newCenterName.trim() !== '') {
      const newCenter = {
        id: sportsCenters.length + 1,
        name: newCenterName,
      };
      setSportsCenters([...sportsCenters, newCenter]);
      setNewCenterName('');
    }
  };

  const handleDeleteCenter = (id) => {
    setSportsCenters(sportsCenters.filter(center => center.id !== id));
  };

  return (
    <div>
      <h2>Zarządzanie Obiektami Sportowymi</h2>
      <ul className="list-group mb-4">
        {sportsCenters.map(center => (
          <li key={center.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{center.name}</span>
            <div>
              <Link to={`/admin/${center.id}/dashboard`} className="btn btn-primary mr-2">Zarządzaj</Link>
              <button className="btn btn-danger" onClick={() => handleDeleteCenter(center.id)}>Usuń</button>
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

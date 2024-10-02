import React from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';

function Dashboard() {
  return <h2>Dashboard</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function Walls() {
  return <h2>Walls</h2>;
}

function AdminPanel() {
  const { centerId } = useParams(); // Pobieramy centerId z parametrów ścieżki

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
        <h2 className="text-center mb-4">Climb Center: {centerId}</h2> {/* Wyświetlamy centerId */}
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to={`/admin/${centerId}/dashboard`}>
              Dashboard
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to={`/admin/${centerId}/users`}>
              Users
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to={`/admin/${centerId}/walls`}>
              Walls
            </Link>
          </li>
        </ul>
        <div className="mt-auto">
          <button className="btn btn-danger w-100" onClick={() => alert("Wylogowano!")}>
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="walls" element={<Walls />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPanel;

import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactQuill from 'react-quill'; // Import Quill
import 'react-quill/dist/quill.snow.css'; // Import style dla Quill
import { Modal, Button } from 'react-bootstrap';
import Info from './AdminInfo';
import Walls from './AdminWalls';
import News from './AdminNews';
import Moderators from './AdminMods';
import 'leaflet/dist/leaflet.css';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Przykładowe dane dla wykresu w Dashboard
function Dashboard() {
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Online Users',
        data: [12, 19, 10, 5, 22, 30, 25],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Users Online Per Day' },
    },
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <Line data={data} options={options} />
    </div>
  );
}





// AdminPanel z zagnieżdżonymi trasami
function ModPanel() {
  const { centerId } = useParams();

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
        <h2 className="text-center mb-4">Climb Center: {centerId}</h2>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to={`/moderator/${centerId}/dashboard`}>Dashboard</Link>
          </li>
          {/* <li className="nav-item mb-2">
            <Link className="nav-link text-white" to={`/moderator/${centerId}/users`}>Users</Link>
          </li> */}
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to={`/moderator/${centerId}/walls`}>Walls</Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to={`/moderator/${centerId}/news`}>News</Link>
          </li>
          {/* <li className="nav-item mb-2">
            <Link className="nav-link text-white" to={`/moderator/${centerId}/moderators`}>Moderators</Link>
          </li> */}
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to={`/moderator/${centerId}/info`}>Info</Link>
          </li>
        </ul>
      </div>
      <div className="flex-grow-1 p-3">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route path="users" element={<Users />} /> */}
          <Route path="walls" element={<Walls />} />
          <Route path="news" element={<News />} />
          <Route path="info" element={<Info centerId={centerId} />} />
          <Route path="moderators" element={<Moderators />} />
        </Routes>
      </div>
    </div>
  );
}

export default ModPanel;

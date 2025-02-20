import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Upewnij się, że Bootstrap jest załadowany
import ReactQuill from 'react-quill'; // Import Quill
import 'react-quill/dist/quill.snow.css'; // Import style dla Quill
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Info from './AdminInfo';
import Walls from './AdminWalls';
import News from './AdminNews';
import Moderators from './AdminMods';
import 'leaflet/dist/leaflet.css';
import api from '/src/api.js'


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
function AdminPanel() {
  const { centerId } = useParams();
  const [authResponse, setAuthResponse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const response = await api.get('/auth/me');
        setAuthResponse(response.data);
      } catch (error) {
        console.error('Error fetching auth data', error);
        navigate('/login'); // Przekierowanie na stronę logowania w razie błędu
      }
    };

    fetchAuth();
  }, []);

  if (!authResponse) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <button
        className="btn btn-danger position-absolute top-0 end-0"
        onClick={() => {
          api.post('/auth/logout');
          navigate('/login');
        }}
      >
        Log out
      </button>

      
      {authResponse.role === 'superadmin' && (
        <Link to="/superadmin/gyms" className="btn btn-primary position-absolute top-0 start-0 m-2">
          Super Admin Panel
        </Link>
      )}

      <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
        <h2 className="text-center mb-4">
          Climb Center: <font size="4">{centerId}</font>
        </h2>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to={`/admin/${centerId}/dashboard`}>Dashboard</Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to={`/admin/${centerId}/walls`}>Sectors</Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to={`/admin/${centerId}/news`}>News</Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to={`/admin/${centerId}/moderators`}>Moderators</Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to={`/admin/${centerId}/info`}>Info</Link>
          </li>
        </ul>
      </div>
      <div className="flex-grow-1 p-3">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="walls" element={<Walls />} />
          <Route path="news" element={<News />} />
          <Route path="info" element={<Info centerId={centerId} />} />
          <Route path="moderators" element={<Moderators />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPanel;

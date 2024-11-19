import React, { useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Upewnij się, że Bootstrap jest załadowany
import ReactQuill from 'react-quill'; // Import Quill
import 'react-quill/dist/quill.snow.css'; // Import style dla Quill
import { Modal, Button } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
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

// Komponent News
function News() {
  const [newsItems, setNewsItems] = useState([
    {
      id: 1,
      title: 'New Gym Opening in Warsaw!',
      description: 'A brand new gym has opened in Warsaw with state-of-the-art equipment.',
      imageUrl: 'https://via.placeholder.com/100',
      fullContent: 'Full details about the new gym opening in Warsaw...',
    },
    {
      id: 2,
      title: 'Climbing Event This Weekend',
      description: 'Join us for a fun climbing event happening this weekend!',
      imageUrl: 'https://via.placeholder.com/100',
      fullContent: 'Full details about the climbing event happening this weekend...',
    },
    {
      id: 3,
      title: 'Fitness Classes Starting Soon',
      description: 'Our new fitness classes are starting next week. Sign up today!',
      imageUrl: 'https://via.placeholder.com/100',
      fullContent: 'Full details about the upcoming fitness classes...',
    },
  ]);

  const [newNews, setNewNews] = useState({ id: '', title: '', description: '', imageUrl: '', fullContent: '' });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (id) => {
    const newsToEdit = newsItems.find(news => news.id === id);
    setNewNews(newsToEdit);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setNewsItems(newsItems.filter(news => news.id !== id));
  };

  const handleAddOrUpdateNews = () => {
    if (isEditing) {
      setNewsItems(newsItems.map(news => (news.id === newNews.id ? newNews : news)));
    } else {
      setNewsItems([...newsItems, { ...newNews, id: newsItems.length + 1 }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setNewNews({ id: '', title: '', description: '', imageUrl: '', fullContent: '' });
    setShowModal(false);
    setIsEditing(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewNews({ ...newNews, imageUrl: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2>News</h2>
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>Add News</button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {newsItems.map((news) => (
            <tr key={news.id}>
              <td>{news.id}</td>
              <td><img src={news.imageUrl} alt={news.title} style={{ width: '50px' }} /></td>
              <td>{news.title}</td>
              <td>
                <button className="btn btn-warning mr-2" onClick={() => handleEdit(news.id)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(news.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding/updating news */}
      {showModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditing ? 'Edit News' : 'Add News'}</h5>
                <button type="button" className="close" onClick={resetForm}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newNews.title}
                    onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newNews.description}
                    onChange={(e) => setNewNews({ ...newNews, description: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Image Upload</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="form-group">
                  <label>Full Content</label>
                  <ReactQuill
                    value={newNews.fullContent}
                    onChange={(content) => setNewNews({ ...newNews, fullContent: content })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleAddOrUpdateNews}>
                  {isEditing ? 'Update News' : 'Add News'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Info() {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState([51.505, -0.09]);
  const [hours, setHours] = useState({
    monday: { open: '', close: '' },
    tuesday: { open: '', close: '' },
    wednesday: { open: '', close: '' },
    thursday: { open: '', close: '' },
    friday: { open: '', close: '' },
    saturday: { open: '', close: '' },
    sunday: { open: '', close: '' },
  });

  const handleSave = () => {
    alert(`Address: ${address}, Coordinates: ${coordinates}, Hours: ${JSON.stringify(hours)}`);
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setCoordinates([e.latlng.lat, e.latlng.lng]);
      },
    });
    return coordinates ? <Marker position={coordinates}></Marker> : null;
  };

  return (
    <div>
      <h2>Info</h2>

      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          className="form-control"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Opening Hours</label>
        {Object.keys(hours).map((day) => (
          <div key={day} className="mb-3">
            <label>{day.charAt(0).toUpperCase() + day.slice(1)}:</label>
            <div className="d-flex align-items-center">
              <input
                type="time"
                className="form-control me-2"
                value={hours[day].open}
                onChange={(e) =>
                  setHours({
                    ...hours,
                    [day]: { ...hours[day], open: e.target.value },
                  })
                }
              />
              <span className="mx-1">to</span>
              <input
                type="time"
                className="form-control"
                value={hours[day].close}
                onChange={(e) =>
                  setHours({
                    ...hours,
                    [day]: { ...hours[day], close: e.target.value },
                  })
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div className="form-group">
        <label>Map - Click to set coordinates</label>
        <MapContainer center={coordinates} zoom={13} style={{ height: '300px', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker />
        </MapContainer>
      </div>

      <button className="btn btn-primary mt-3" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}


// Komponent Walls
function Walls() {
  const walls = [
    { id: 1, name: 'Wall A', height: '15m' },
    { id: 2, name: 'Wall B', height: '20m' },
  ];

  const handleEdit = (id) => {
    alert(`Edit wall with id ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete wall with id ${id}`);
  };

  return (
    <div>
      <h2>Walls</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Height</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {walls.map((wall) => (
            <tr key={wall.id}>
              <td>{wall.id}</td>
              <td>{wall.name}</td>
              <td>{wall.height}</td>
              <td>
                <button className="btn btn-warning mr-2" onClick={() => handleEdit(wall.id)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(wall.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


// AdminPanel z zagnieżdżonymi trasami
function AdminPanel() {
  const { centerId } = useParams();

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
        <h2 className="text-center mb-4">Climb Center: {centerId}</h2>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to={`/admin/${centerId}/dashboard`}>Dashboard</Link>
          </li>
          {/* <li className="nav-item mb-2">
            <Link className="nav-link text-white" to={`/admin/${centerId}/users`}>Users</Link>
          </li> */}
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to={`/admin/${centerId}/walls`}>Walls</Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to={`/admin/${centerId}/news`}>News</Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to={`/admin/${centerId}/info`}>Info</Link>
          </li>
        </ul>
      </div>
      <div className="flex-grow-1 p-3">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route path="users" element={<Users />} /> */}
          <Route path="walls" element={<Walls />} />
          <Route path="news" element={<News />} />
          <Route path="info" element={<Info />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPanel;

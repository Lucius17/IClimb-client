import React, { useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Upewnij się, że Bootstrap jest załadowany
import ReactQuill from 'react-quill'; // Import Quill
import 'react-quill/dist/quill.snow.css'; // Import style dla Quill
import { Modal, Button } from 'react-bootstrap';

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
  const [hours, setHours] = useState('');

  return (
    <div>
      <h2>Info</h2>
      <div className="form-group">
        <label>Address</label>
        <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Opening Hours</label>
        <input type="text" className="form-control" value={hours} onChange={(e) => setHours(e.target.value)} />
      </div>
      <button className="btn btn-primary mt-3" onClick={() => alert(`Address: ${address}, Hours: ${hours}`)}>
        Save
      </button>
    </div>
  );
}

// Komponent Users
function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', gender: 'Male', skills: 'Yes', nickname: 'johnny' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', gender: 'Female', skills: 'No', nickname: 'jane' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowEditModal(true);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleSave = () => {
    setUsers(users.map(user => user.id === currentUser.id ? currentUser : user));
    setShowEditModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <h2>Users</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Skills</th>
            <th>Nickname</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.skills}</td>
              <td>{user.nickname}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(user)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Editing User */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentUser && (
            <>
              <div className="form-group mb-3">
                <label>ID</label>
                <input type="text" className="form-control" value={currentUser.id} disabled />
              </div>
              <div className="form-group mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={currentUser.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={currentUser.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mb-3">
                <label>Gender</label>
                <input
                  type="text"
                  className="form-control"
                  name="gender"
                  value={currentUser.gender}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mb-3">
                <label>Skills</label>
                <input
                  type="text"
                  className="form-control"
                  name="skills"
                  value={currentUser.skills}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mb-3">
                <label>Nickname</label>
                <input
                  type="text"
                  className="form-control"
                  name="nickname"
                  value={currentUser.nickname}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
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
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to={`/admin/${centerId}/users`}>Users</Link>
          </li>
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
          <Route path="users" element={<Users />} />
          <Route path="walls" element={<Walls />} />
          <Route path="news" element={<News />} />
          <Route path="info" element={<Info />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPanel;

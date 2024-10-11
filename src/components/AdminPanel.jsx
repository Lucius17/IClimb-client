import React, { useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Upewnij się, że Bootstrap jest załadowany

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
                  <textarea
                    className="form-control"
                    value={newNews.fullContent}
                    onChange={(e) => setNewNews({ ...newNews, fullContent: e.target.value })}
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

// Komponent Users
function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', gender: 'Male', skills: 'Yes', nickname: 'johnny' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', gender: 'Female', skills: 'No', nickname: 'jane' },
  ]);

  const [newUser, setNewUser] = useState({ id: '', name: '', email: '', gender: '', skills: '', nickname: '' });
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (id) => {
    alert(`Edit user with id ${id}`);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleAddUser = () => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNewUser({ id: '', name: '', email: '', gender: '', skills: '', nickname: '' });
    setShowModal(false);
  };

  return (
    <div>
      <h2>Users</h2>
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Add User
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Skills (Belay)</th>
            <th>Nickname</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.skills}</td>
              <td>{user.nickname}</td>
              <td>
                <button className="btn btn-warning mr-2" onClick={() => handleEdit(user.id)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding new user */}
      {showModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add User</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>ID</label>
                  <input type="number" className="form-control" value={newUser.id} onChange={(e) => setNewUser({ ...newUser, id: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select className="form-control" value={newUser.gender} onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Skills (Belay)</label>
                  <select className="form-control" value={newUser.skills} onChange={(e) => setNewUser({ ...newUser, skills: e.target.value })}>
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Nickname</label>
                  <input type="text" className="form-control" value={newUser.nickname} onChange={(e) => setNewUser({ ...newUser, nickname: e.target.value })} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleAddUser}>
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
        <h2 className="text-center mb-4">Climb Center: {centerId}</h2>
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
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to={`/admin/${centerId}/news`}>
              News
            </Link>
          </li>
        </ul>
        <div className="mt-auto">
          <button className="btn btn-danger w-100" onClick={() => alert('Wylogowano!')}>
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
          <Route path="news" element={<News />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPanel;

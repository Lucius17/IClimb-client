// Users.jsx
import React, {useEffect, useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import api from '/src/api.js'

function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users/users');
      setUsers(response.data);
    }catch(err) {
      console.error('Error fetching users:', err);
    }
  }

  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowEditModal(true);
  };

  const handleDelete = async (userId) => {
    try {
      await api.delete(`/users/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  const handleSave = async () => {
    try {
      await api.put(`/users/users/${currentUser._id}`, currentUser);
      setUsers(users.map(user => (user._id === currentUser._id ? currentUser : user)));
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const filteredUsers = users.filter(user =>
    user.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    (async () => {
      await fetchUsers();
    })();
  }, []);

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
          <th>Nickname</th>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Belay</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id.slice(-4)}</td>
                <td>{user.nickname}</td>
                <td>{user.name || '-'}</td>
                <td>{user.email}</td>
                <td>{user.gender || "-"}</td>
                <td>{user.belay ? 'Yes' : 'No'}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(user)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
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
                <input type="text" className="form-control" value={currentUser._id} disabled />
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
                <label>Belay</label>
                <input
                    className="form-control"
                    name="belay"
                    value={currentUser.belay}
                    onChange={handleChange}
                >
                </input>
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

export default Users;

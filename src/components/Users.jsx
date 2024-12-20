import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import api from '/src/api.js';

function Users() {
  const [users, setUsers] = useState([]);
  const [genderFilter, setGenderFilter] = useState('');
  const [belayFilter, setBelayFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [nicknameFilter, setNicknameFilter] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users/users');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowEditModal(true);
  };

  const handleDeleteRequest = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (userToDelete) {
        await api.delete(`/users/users/${userToDelete._id}`);
        setUsers(users.filter((user) => user._id !== userToDelete._id));
        setUserToDelete(null);
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSave = async () => {
    try {
      await api.put(`/users/users/${currentUser._id}`, currentUser);
      setUsers(users.map((user) => (user._id === currentUser._id ? currentUser : user)));
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const filteredUsers = users.filter((user) => {
    const matchesGender =
      !genderFilter || user.gender?.toLowerCase() === genderFilter.toLowerCase();
    const matchesBelay =
      !belayFilter || (belayFilter === 'yes' ? user.belay : !user.belay);
    const matchesEmail =
      !emailFilter || user.email?.toLowerCase().includes(emailFilter.toLowerCase());
    const matchesNickname =
      !nicknameFilter ||
      user.nickname?.toLowerCase().includes(nicknameFilter.toLowerCase());

    return matchesGender && matchesBelay && matchesEmail && matchesNickname;
  });

  useEffect(() => {
    (async () => {
      await fetchUsers();
    })();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <div className="row mb-3">
        <div className="col-md-3">
          <select
            className="form-control"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={belayFilter}
            onChange={(e) => setBelayFilter(e.target.value)}
          >
            <option value="">All Belay Options</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Email"
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Nickname"
            value={nicknameFilter}
            onChange={(e) => setNicknameFilter(e.target.value)}
          />
        </div>
      </div>
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
              <td>{user.gender || '-'}</td>
              <td>{user.belay ? 'Yes' : 'No'}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteRequest(user)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modals remain unchanged */}
    </div>
  );
}

export default Users;

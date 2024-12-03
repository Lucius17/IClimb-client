import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Moderators() {
	const [moderators, setModerators] = useState([
	  { id: '1', email: 'moderator1@example.com', password: 'password123' },
	  { id: '2', email: 'moderator2@example.com', password: 'password456' },
	]);
  
	const [showAddModal, setShowAddModal] = useState(false);
	const [newModerator, setNewModerator] = useState({ email: '', password: '' });
  
	const handleDelete = (id) => {
	  setModerators(moderators.filter((mod) => mod.id !== id));
	};
  
	const handleAdd = () => {
	  if (newModerator.email && newModerator.password) {
		setModerators([
		  ...moderators,
		  { id: Date.now().toString(), ...newModerator },
		]);
		setNewModerator({ email: '', password: '' });
		setShowAddModal(false);
	  }
	};
  
	const handleChange = (e) => {
	  const { name, value } = e.target;
	  setNewModerator({ ...newModerator, [name]: value });
	};
  
	return (
	  <div>
		<h2>Moderators</h2>
		<table className="table">
		  <thead>
			<tr>
			  <th>ID</th>
			  <th>Email</th>
			  <th>Actions</th>
			</tr>
		  </thead>
		  <tbody>
			{moderators.map((mod) => (
			  <tr key={mod.id}>
				<td>{mod.id}</td>
				<td>{mod.email}</td>
				<td>
				  <button
					className="btn btn-danger btn-sm"
					onClick={() => handleDelete(mod.id)}
				  >
					Delete
				  </button>
				</td>
			  </tr>
			))}
		  </tbody>
		</table>
		<button
		  className="btn btn-primary"
		  onClick={() => setShowAddModal(true)}
		>
		  Add Moderator
		</button>
  
		{/* Modal for Adding Moderator */}
		<Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
		  <Modal.Header closeButton>
			<Modal.Title>Add Moderator</Modal.Title>
		  </Modal.Header>
		  <Modal.Body>
			<div className="form-group mb-3">
			  <label>Email</label>
			  <input
				type="email"
				className="form-control"
				name="email"
				value={newModerator.email}
				onChange={handleChange}
			  />
			</div>
			<div className="form-group mb-3">
			  <label>Password</label>
			  <input
				type="password"
				className="form-control"
				name="password"
				value={newModerator.password}
				onChange={handleChange}
			  />
			</div>
		  </Modal.Body>
		  <Modal.Footer>
			<Button variant="secondary" onClick={() => setShowAddModal(false)}>
			  Cancel
			</Button>
			<Button variant="primary" onClick={handleAdd}>
			  Add Moderator
			</Button>
		  </Modal.Footer>
		</Modal>
	  </div>
	);
  }

export default Moderators
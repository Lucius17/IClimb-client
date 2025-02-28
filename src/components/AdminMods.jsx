import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import api from '/src/api.js';

function Moderators({ gymId }) {
	const [moderators, setModerators] = useState([]);
	const [showAddModal, setShowAddModal] = useState(false);
	const [newModerator, setNewModerator] = useState({ email: '', password: '' });

	// Fetch moderators when component mounts
	useEffect(() => {
		const fetchModerators = async () => {
			try {
				const { data } = await api.get(`/gyms/gym/${gymId}/moderators`);
				setModerators(data);
			} catch (error) {
				console.error('Error fetching moderators:', error);
			}
		};

		if (gymId) {
			fetchModerators();
		}
	}, [gymId]);

	// Handle deleting a moderator
	const handleDelete = async (id) => {
		try {
			await api.delete(`/gyms/gym/${gymId}/moderators/${id}`);
			setModerators(moderators.filter((mod) => mod._id !== id));
		} catch (error) {
			console.error('Error deleting moderator:', error);
		}
	};

	// Handle adding a moderator
	const handleAdd = async () => {
		if (newModerator.email && newModerator.password) {
			try {
				const { data } = await api.post(`/gyms/gym/${gymId}/add-mod`, newModerator);
				setModerators([...moderators, data]);
				setNewModerator({ email: '', password: '' });
				setShowAddModal(false);
			} catch (error) {
				console.error('Error adding moderator:', error);
			}
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewModerator({ ...newModerator, [name]: value });
	};

	return (
		<div>
			<h2>Moderators</h2>
			{moderators.length === 0 ? (
				<p>No moderators found.</p>
			) : (
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
						<tr key={mod._id}>
							<td>{mod._id}</td>
							<td>{mod.email}</td>
							<td>
								<button className="btn btn-danger btn-sm" onClick={() => handleDelete(mod._id)}>
									Delete
								</button>
							</td>
						</tr>
					))}
					</tbody>
				</table>
			)}
			<button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
				Add Moderator
			</button>

			{/* Modal for Adding Moderator */}
			<Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Add Moderator</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" name="email" value={newModerator.email} onChange={handleChange} />
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" name="password" value={newModerator.password} onChange={handleChange} />
						</Form.Group>
					</Form>
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

Moderators.propTypes = {
	gymId: PropTypes.string.isRequired,
};

export default Moderators;

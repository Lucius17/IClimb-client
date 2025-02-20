import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Added Link for navigation
import api from "/src/api.js";
import "bootstrap/dist/css/bootstrap.min.css";

const Walls = () => {
	const { centerId } = useParams();
	const [sectors, setSectors] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showAddForm, setShowAddForm] = useState(false);
	const [showEditForm, setShowEditForm] = useState(false);
	const [newSector, setNewSector] = useState({ name: "", svg: null });
	const [currentEditSector, setCurrentEditSector] = useState(null);
	const [authResponse, setAuthResponse] = useState(null);

	useEffect(() => {
		const fetchSectors = async () => {
			try {
				const response = await api.get(`/gyms/Gym/${centerId}/sectors`);
				setSectors(response.data.sectors || []);
				setError(null);
			} catch (err) {
				console.error("Error fetching sectors:", err);
				setError("Failed to load walls.");
			} finally {
				setLoading(false);
			}
		};
		fetchSectors();

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
	}, [centerId]);


	const handleEdit = (sector) => {
		setCurrentEditSector(sector);
		setShowEditForm(true);
	};

	const handleDelete = async (id) => {
		if (window.confirm("Are you sure you want to delete this wall/sector?")) {
			try {
				await api.delete(`/gyms/Gym/${centerId}/sectors/${id}`);
				setSectors((prevSectors) => prevSectors.filter((sector) => sector._id !== id));
				alert("Wall/sector deleted successfully.");
			} catch (err) {
				console.error("Error deleting wall/sector:", err);
				alert("Failed to delete wall/sector.");
			}
		}
	};

	const handleAddSector = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("name", newSector.name);
		formData.append("svg", newSector.svg);

		try {
			const response = await api.post(`/gyms/Gym/${centerId}/sectors`, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			setSectors((prev) => [...prev, response.data]);
			alert("Sector added successfully.");
			setShowAddForm(false);
			setNewSector({ name: "", svg: null });
		} catch (err) {
			console.error("Error adding sector:", err);
			alert("Failed to add sector.");
		}
	};

	const handleUpdateSector = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("name", currentEditSector.name);
		if (currentEditSector.svg) {
			formData.append("svg", currentEditSector.svg);
		}

		try {
			const response = await api.put(
				`/gyms/Gym/${centerId}/sectors/${currentEditSector._id}`,
				formData,
				{ headers: { "Content-Type": "multipart/form-data" } }
			);
			setSectors((prevSectors) =>
				prevSectors.map((sector) =>
					sector._id === currentEditSector._id ? response.data : sector
				)
			);
			alert("Sector updated successfully.");
			setShowEditForm(false);
			setCurrentEditSector(null);
		} catch (err) {
			console.error("Error updating sector:", err);
			alert("Failed to update sector.");
		}
	};

	return (
		<div>
			<h2>Sectors</h2>
			{loading ? (
				<p>Loading walls...</p>
			) : error ? (
				<p className="text-danger">{error}</p>
			) : (
				<>
					<table className="table">
						<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Actions</th>
						</tr>
						</thead>
						<tbody>
						{sectors.map((sector) => (
							<tr key={sector._id}>
								<td>{sector._id}</td>
								<td>{sector.name}</td>
								<td>
								{
  authResponse === null ? (
    <p>Loading...</p>
  ) : authResponse.role === 'superadmin' ? (
    <>
      <button
        className="btn btn-warning mr-2"
        onClick={() => handleEdit(sector)}
      >
        Edit
      </button>
      <button
        className="btn btn-danger mr-2"
        onClick={() => handleDelete(sector._id)}
      >
        Delete
      </button>
    </>
  ) : null
}
									
									
									<Link
										to={`/edytor/${centerId}/sectors/${sector._id}`}
										className="btn btn-primary"
									>
										Edit Routes
									</Link>
								</td>
							</tr>
						))}
						</tbody>
					</table>
					{
  authResponse === null ? (
    <p>Loading...</p>
  ) : authResponse.role === 'superadmin' ? (
    <>
	<button
						className="btn btn-primary mt-3"
						onClick={() => setShowAddForm(!showAddForm)}
					>
						{showAddForm ? "Cancel" : "Add Sector"}
					</button>
    </>
  ) : null
}
					
					{showAddForm && (
						<form onSubmit={handleAddSector} className="mt-3">
							<div className="mb-3">
								<label className="form-label">Sector Name</label>
								<input
									type="text"
									className="form-control"
									value={newSector.name}
									onChange={(e) =>
										setNewSector({ ...newSector, name: e.target.value })
									}
									required
								/>
							</div>
							<div className="mb-3">
								<label className="form-label">SVG File</label>
								<input
									type="file"
									accept=".svg"
									className="form-control"
									onChange={(e) =>
										setNewSector({ ...newSector, svg: e.target.files[0] })
									}
									required
								/>
							</div>
							<button type="submit" className="btn btn-success">
								Add Sector
							</button>
						</form>
					)}
					{showEditForm && (
						<form onSubmit={handleUpdateSector} className="mt-3">
							<div className="mb-3">
								<label className="form-label">Edit Sector Name</label>
								<input
									type="text"
									className="form-control"
									value={currentEditSector.name}
									onChange={(e) =>
										setCurrentEditSector({
											...currentEditSector,
											name: e.target.value,
										})
									}
									required
								/>
							</div>
							<div className="mb-3">
								<label className="form-label">SVG File (Optional)</label>
								<input
									type="file"
									accept=".svg"
									className="form-control"
									onChange={(e) =>
										setCurrentEditSector({
											...currentEditSector,
											svg: e.target.files[0],
										})
									}
								/>
							</div>
							<button type="submit" className="btn btn-success">
								Update Sector
							</button>
							<button
								type="button"
								className="btn btn-secondary ml-2"
								onClick={() => {
									setShowEditForm(false);
									setCurrentEditSector(null);
								}}
							>
								Cancel
							</button>
						</form>
					)}
				</>
			)}
		</div>
	);
};

export default Walls;

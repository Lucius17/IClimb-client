import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '/src/api.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sectors = () => {
	const { gymId } = useParams();
	const [sectors, setSectors] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSectors = async () => {
			try {
				const response = await api.get(`/gyms/Gym/${gymId}/sectors`);
				setSectors(response.data.sectors || []);
				setError(null);
			} catch (err) {
				console.error('Error fetching sectors:', err);
				setError('Failed to load sectors.');
			} finally {
				setLoading(false);
			}
		};

		fetchSectors();
	}, [gymId]);

	return (
		<>
			<div className="fixed-top text-center absolute">
				<h1>Sectors</h1>
			</div>

			<div className="container mt-5">
				{loading ? (
					<p>Loading sectors...</p>
				) : error ? (
					<p className="text-danger">{error}</p>
				) : sectors.length > 0 ? (
					<div className="row">
						{sectors.map((sector) => (
							<div className="col-md-4" key={sector._id}>
								<div className="card">
									<div className="card-body">
										<h5 className="card-title">{sector.name}</h5>
										<p className="card-text">Routes: {sector.routes.length}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<p>No sectors available for this gym.</p>
				)}
			</div>
		</>
	);
};

export default Sectors;

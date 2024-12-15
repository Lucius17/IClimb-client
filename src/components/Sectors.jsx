import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '/src/api.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sectors = () => {
	const { gymId } = useParams(); // Extract gym ID from the URL
	const [sectors, setSectors] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSectors = async () => {
			try {
				const response = await api.get(`/gyms/Gym/${gymId}`);
				const gymData = response.data;
				setSectors(gymData.sectors || []);
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
						{sectors.map((sector, index) => (
							<div className="col-md-4" key={index}>
								<div className="card">
									<div className="card-body">
										<h5 className="card-title">{sector}</h5>
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

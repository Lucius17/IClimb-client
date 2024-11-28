import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sectors = () => {
	const [sectors, setSectors] = useState([
		{id:1, name:"Lina"},
		{id:2, name:"Spray wall"},
	]);

	return (
		<>

		<div className="fixed-top text-center absolute">
			<h1>Sectors</h1>
		</div>
		

		<div className="container mt-5">

			<div className="row">
				{sectors.map((sector) => (
					<div className="col-md-4" key={sector.id}>
						<div className="card">
							<div className="card-body">
								<h5 className="card-title">{sector.name}</h5>
							</div>
						</div>
					</div>
				))}
			</div>

		</div>
		</>
	);
};	

export default Sectors;
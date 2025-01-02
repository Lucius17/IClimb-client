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
		<h2>Sectors</h2>
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

  export default Walls;
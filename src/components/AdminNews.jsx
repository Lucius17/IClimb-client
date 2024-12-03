import ReactQuill from 'react-quill'; // Import Quill
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';


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
					<ReactQuill
					  value={newNews.fullContent}
					  onChange={(content) => setNewNews({ ...newNews, fullContent: content })}
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
export default News;  
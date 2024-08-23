import React from 'react';
import Menu from './Menu.jsx';

function Profile() {
	return (
		
	  <div className="container text-center mt-5">
	  
		<div className="row">
		  <div className="col-12">
			<img src="../assets/avatar.png" alt="Avatar" className="rounded-circle mb-3" style={{ width: '100px' }} />
			<h2>Username</h2>
			<p>Random dane: Lorem Ipsum dolor sit amet</p>
			<div className="mt-5">
			  <h4>Stats:</h4>
			  {/* Tutaj można dodać wykres z pomocą Chart.js lub ProgressBar z Bootstrapa */}
			</div>
		  </div>
		</div>
		
		<Menu />
	  </div>
	);
  }
  
  export default Profile;
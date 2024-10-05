import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import Menu from './Menu';

function Profile() {
  const [avatar, setAvatar] = useState('https://via.placeholder.com/150'); // Użycie URL jako placeholder

  const [gymName, setGymName] = useState('Gym Warszawa');

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  const activityData = {
    labels: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'],
    datasets: [
      {
        label: 'Aktywność (godziny)',
        data: [2, 1.5, 3, 2.5, 4],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
	<>
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4 text-center">
          <img
            src={avatar}
            alt="Avatar"
            className="rounded-circle"
            style={{ width: '150px', height: '150px', cursor: 'pointer' }}
            onClick={() => document.getElementById('avatarInput').click()}
          />
          <input
            type="file"
            id="avatarInput"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </div>
        <div className="col-md-8">
          <h2>Twój Profil</h2>
          <p>Siłownia: {gymName}</p>
          <button className="btn btn-primary mb-3" onClick={() => alert('Zmiana siłowni!')}>
            Zmień siłownię
          </button>
          <button className="btn btn-secondary mb-3" onClick={() => alert('Edycja profilu!')}>
            Edytuj profil
          </button>
        </div>
      </div>

      <div className="row mt-5">
        <h3>Twoja aktywność</h3>
        <Line data={activityData} />
      </div>
    </div>

	<Menu />
	</>

  );
}

export default Profile;

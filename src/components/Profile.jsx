import React, {useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useNavigate } from 'react-router-dom';
import Menu from './Menu';
import api from '/src/api.js'

function Profile() {
  const [avatar, setAvatar] = useState('https://via.placeholder.com/150'); // Użycie URL jako placeholder
  const [gymName, setGymName] = useState('Gym Warszawa');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  

  const [formData, setFormData] = useState({
    avatar: avatar,
    gymName: gymName,
    name: 'Jan Kowalski',
    email: 'jan.kowalski@example.com',
    nickname: 'Janek2115',
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/auth/me');
        if (response.data) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            ...response.data,
          }));
          console.log('Gym ID:', formData.gym); // Should print the ID string, not an object
          if (response.data.gymName) setGymName(response.data.gymName);
        } else {
          console.error('No user data returned from API');
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchGymName = async () => {
      if (formData.gym) {
        try {

          const gymId = formData.gym.toString();
          const response = await api.get(`/gyms/Gym/${gymId}`);

          if (response.data) {

            setGymName(response.data.name);
          } else {
            console.error('Gym not found');
          }
        } catch (error) {
          console.error('Failed to fetch GymName:', error);
        }
      }
    };

    fetchGymName();
  }, [formData.gym]); // Dependency on formData.gym to trigger the effect

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
      setFormData({ ...formData, avatar: imageUrl });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await api.put('users/me', formData);
      if (response.data.user) {
        setFormData(response.data.user);
        setIsEditing(false);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
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
        {isEditing ? (
          <div className="row">
            <div className="col-md-4 text-center">
              <img
                src={formData.avatar}
                alt="Avatar"
                className="rounded-circle"
                style={{ width: '150px', height: '150px', cursor: 'pointer' }}
                onClick={() => document.getElementById('avatarEditInput').click()}
              />
              <input
                type="file"
                id="avatarEditInput"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
            <div className="col-md-8">
              <h2>Edytuj Profil</h2>
              <div className="form-group mb-3">
                <label>Imię</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group mb-3">
                <label>Nickname</label>
                <input
                  type="text"
                  className="form-control"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleInputChange}
                />
              </div>
              <button className="btn btn-success me-2" onClick={handleSave}>
                Zapisz
              </button>
              <button className="btn btn-danger" onClick={() => setIsEditing(false)}>
                Anuluj
              </button>
            </div>
          </div>
        ) : (
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
              <p>Imię: {formData.name}</p>
              <p>Email: {formData.email}</p>
              <p>Siłownia: {gymName}</p>
              <p>Nickname: {formData.nickname}</p>
              <button
                className="btn btn-primary mb-3 me-2"
                onClick={() => navigate('/gym')}
              >
                Zmień siłownię
              </button>
              <button className="btn btn-secondary mb-3" onClick={() => setIsEditing(true)}>
                Edytuj profil
              </button>
            </div>
          </div>
        )}

        <div className="row mt-5">
          <h3>Twoja aktywność</h3>
          <Line data={activityData} />
        </div>

        <button
          className="btn btn-danger mt-5"
          onClick={() => {
            api.post('/auth/logout');
            navigate('/login');
          }}
        >
          Log out
        </button>
      </div>


      <Menu />
    </>
  );
}

export default Profile;

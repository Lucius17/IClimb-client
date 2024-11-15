import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import api from '/src/api.js'
import Menu from './Menu';

function GymList() {
    const [centers, setCenters] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchGyms = async () => {
            try {
                const response = await api.get('/gyms/gym');
                const gyms =response.data.map((gym) => ({
                    id: gym._id,
                    name: gym.name,
                    distance: gym.location || 'unknown',
                    imageUrl: gym.logo,
                }));
                setCenters(gyms.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance)));
            } catch (error) {
                console.error('Error fetching gyms:', error);
            }
        };

        fetchGyms();
    }, []);

    return (
        <div className="container my-4">
            <table className={`table table-striped`}>
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Address</th>
                </tr>
                </thead>
                <tbody>
                {centers.map((center) => (
                    <tr key={center.id} onClick={() => navigate(`/gym/${center.id}`)} style={{ cursor: 'pointer' }}>
                        <td>
                            <img src={center.imageUrl} alt="Center Logo" style={{ width: '50px' }} />
                        </td>
                        <td>{center.name}</td>
                        <td>{center.distance}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Menu />
        </div>
    );
}

export default GymList;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from './Menu';
import { useTheme } from '../ThemeContext';

function GymList() {
    const [centers, setCenters] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const initialCenters = [
            { id: 1, name: 'Centrum Wspinaczki 1', distance: '0.5', imageUrl: 'https://via.placeholder.com/50' },
            { id: 2, name: 'Centrum Wspinaczki 2', distance: '3', imageUrl: 'https://via.placeholder.com/50' },
            { id: 3, name: 'Centrum Wspinaczki 3', distance: '12', imageUrl: 'https://via.placeholder.com/50' },
            { id: 4, name: 'Centrum Wspinaczki 4', distance: '15', imageUrl: 'https://via.placeholder.com/50' },
            { id: 5, name: 'Centrum Wspinaczki 5', distance: '20', imageUrl: 'https://via.placeholder.com/50' },
            { id: 6, name: 'Centrum Wspinaczki 6', distance: '1', imageUrl: 'https://via.placeholder.com/50' },
        ];
        setCenters(initialCenters.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance)));
    }, []);

    return (
        <div className="container my-4">
            <table className={`table table-striped`}>
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Distance</th>
                </tr>
                </thead>
                <tbody>
                {centers.map((center) => (
                    <tr key={center.id} onClick={() => navigate(`/gym/${center.id}`)} style={{ cursor: 'pointer' }}>
                        <td>
                            <img src={center.imageUrl} alt="Center Logo" style={{ width: '50px' }} />
                        </td>
                        <td>{center.name}</td>
                        <td>{center.distance} km</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Menu />
        </div>
    );
}

export default GymList;

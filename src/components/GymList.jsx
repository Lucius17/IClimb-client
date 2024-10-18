import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu.jsx';

function GymList() {
    const [centers, setCenters] = useState([]);
    const cityName = "Poznań"

    useEffect(() => {
        // const fetchCenters = async () => {
        //     const response = await fetch('/api/centers');
        //     const data = await response.json();
        //     setCenters(data);
        // };
        // fetchCenters();

        const initialCenters = [
            { id: 1, name: 'Centrum Wspinaczki 1', imageUrl: 'https://via.placeholder.com/100' },
            { id: 2, name: 'Centrum Wspinaczki 2', imageUrl: 'https://via.placeholder.com/100' },
            { id: 3, name: 'Centrum Wspinaczki 3', imageUrl: 'https://via.placeholder.com/100' },
            { id: 4, name: 'Centrum Wspinaczki 4', imageUrl: 'https://via.placeholder.com/100' },
            { id: 5, name: 'Centrum Wspinaczki 5', imageUrl: 'https://via.placeholder.com/100' },
            { id: 6, name: 'Centrum Wspinaczki 6', imageUrl: 'https://via.placeholder.com/100' },
        ];
        setCenters(initialCenters);
    }, []);

    return (
        <div className="container">
            <h2 className="my-4">Sports Centers in {cityName}</h2>
            <div className="row">
                {centers.map(center => (
                    <div key={center.id} className="col-md-4 mb-4">
                        <Link to={`/center/${center.id}`} className="card text-decoration-none">
                            <div className="card mb-4">
                                <div className="text-center">
                                    <img src={center.imageUrl} alt={center.name}
                                         className="card-img-top mx-auto d-block"
                                         style={{maxWidth: '100px', height: '100px'}}/>
                                </div>
                                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                    <h5 className="card-title">{center.name}</h5>
                                </div>
                            </div>
                            <h5 className="Center-Distance">2.5 KM</h5>
                        </Link>
                    </div>
                ))}
            </div>
            <Menu/>
        </div>
    );
}

export default GymList;
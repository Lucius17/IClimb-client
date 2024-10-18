import React, { useState, useEffect } from 'react';
import Menu from './Menu.jsx';

function GymList() {
    const [centers, setCenters] = useState([]);
    const cityName = "Poznań"

    useEffect(() => {
        // Symulacja pobierania danych z backendu
        // const fetchCenters = async () => {
        //     const response = await fetch('/api/centers'); // Zmien na odpowiedni endpoint
        //     const data = await response.json();
        //     setCenters(data);
        // };
        // fetchCenters();

        // Zamiast tego tymczasowe dane, jak w SuperAdminPanel
        const initialCenters = [
            { id: 1, name: 'Centrum Wspinaczki 1' },
            { id: 2, name: 'Centrum Wspinaczki 2' },
            { id: 3, name: 'Centrum Wspinaczki 3' },
            { id: 4, name: 'Centrum Wspinaczki 4' },
            { id: 5, name: 'Centrum Wspinaczki 5' },
            { id: 6, name: 'Centrum Wspinaczki 6' },
        ];
        setCenters(initialCenters);
    }, []);

    const handleCenterClick = (centerId) => {
        console.log(`Climbin wall ID: ${centerId}`);
    };

    return (
        <div className="container">
            <h2 className="my-4">Sports Centers in {cityName}</h2>
            <div className="row">
                {centers.map(center => (
                    <div
                        key={center.id}
                        className="col-md-4 mb-4"
                        onClick={() => handleCenterClick(center.id)} // Karta jako klikalny element
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{center.name}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Menu/>
        </div>
    );
}

export default GymList;
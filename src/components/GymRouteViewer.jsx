import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function GymRouteViewer({ routes }) {
    const [selectedRoute, setSelectedRoute] = useState(null);

    return (
        <div className="route-viewer-container">
            <svg width="100%" height="400" viewBox="0 0 500 400">

                <rect x="0" y="0" width="500" height="400" fill="#e0e0e0" />


                {routes.map((route) => (
                    <circle
                        key={route.id}
                        cx={route.x}
                        cy={route.y}
                        r="10"
                        fill={route.color}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRoute(route);
                        }}
                        style={{ cursor: 'pointer' }}
                    />
                ))}
            </svg>

            {selectedRoute && (
                <div className="route-info mt-3 p-3 border rounded">
                    <h5>Informacje o drodze</h5>
                    <p><strong>Autor:</strong> {selectedRoute.author}</p>
                    <p><strong>Utworzona:</strong> {selectedRoute.date}</p>
                    <p><strong>Trudność:</strong> {selectedRoute.difficulty}</p>
                    <button className="btn btn-secondary" onClick={() => setSelectedRoute(null)}>Zamknij</button>
                </div>
            )}
        </div>
    );
}

export default GymRouteViewer;

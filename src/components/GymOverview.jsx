import React from 'react';
import MapView from './MapView';
import GymList from './GymList';

function GymOverview() {
    return (
        <div className="container my-4">
            <h2 className="mb-4">Explore Gyms and Climbing Centers</h2>
            <div className="mb-4">
                <MapView height="50vh" />
            </div>
            <div>
                <GymList />
            </div>
        </div>
    );
}

export default GymOverview;

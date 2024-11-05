import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import GymRouteViewer from './GymRouteViewer';
import GymRouteEditor from './GymRouteEditor';
import Menu from "./Menu.jsx";

function GymDetail({ svgData, routes, setRoutes }) {
    const { id } = useParams();
    const [center, setCenter] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        const centersData = [
            { id: 1, name: 'Centrum Wspinaczki 1', distance: '0.5', imageUrl: 'https://via.placeholder.com/50' },
            { id: 2, name: 'Centrum Wspinaczki 2', distance: '3', imageUrl: 'https://via.placeholder.com/50' },
            { id: 3, name: 'Centrum Wspinaczki 3', distance: '12', imageUrl: 'https://via.placeholder.com/50' },
            { id: 4, name: 'Centrum Wspinaczki 4', distance: '15', imageUrl: 'https://via.placeholder.com/50' },
            { id: 5, name: 'Centrum Wspinaczki 5', distance: '20', imageUrl: 'https://via.placeholder.com/50' },
            { id: 6, name: 'Centrum Wspinaczki 6', distance: '1', imageUrl: 'https://via.placeholder.com/50' },
        ];

        const selectedCenter = centersData.find(center => center.id === parseInt(id));
        setCenter(selectedCenter);
    }, [id]);

    if (!center) return <div>Brak wybranego obiektu</div>;

    return (
        <div className="gym-detail-container">
            <h2>{center.name}</h2>

            <button className="btn btn-primary mb-1" onClick={() => setIsEditMode(!isEditMode)}>
                {isEditMode ? 'Switch to View Mode' : 'Switch to Edit Mode'}
            </button>
            {isEditMode ? (
                <GymRouteEditor svgData={svgData} routes={routes} onSaveRoutes={setRoutes} />
            ) : (
                <GymRouteViewer svgData={svgData} routes={routes} />
            )}
            <Menu/>
        </div>
    );
}

GymDetail.propTypes = {
    svgData: PropTypes.string.isRequired,
    routes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            color: PropTypes.string.isRequired,
            difficulty: PropTypes.string.isRequired,
            date: PropTypes.string,
            author: PropTypes.string,
        })
    ).isRequired,
    setRoutes: PropTypes.func.isRequired,
};

export default GymDetail;

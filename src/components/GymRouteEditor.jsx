import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function GymRouteEditor({ routes, onSaveRoutes }) {
    const [newRoute, setNewRoute] = useState({ id: null, x: 0, y: 0, color: '#ffffff', difficulty: '', author: '' });
    const [selectedRouteId, setSelectedRouteId] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const handleSvgClick = (e) => {
        const svg = e.currentTarget;
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const coords = pt.matrixTransform(svg.getScreenCTM().inverse());
        setNewRoute({ ...newRoute, id: Date.now(), x: coords.x, y: coords.y });
    };

    const saveRoute = () => {
        if (newRoute.id) {
            onSaveRoutes((prevRoutes) => [...prevRoutes, newRoute]);
            setNewRoute({ id: null, x: 0, y: 0, color: '#ffffff', difficulty: '6a', author: '' });
        }
    };

    const deleteRoute = () => {
        onSaveRoutes((prevRoutes) => prevRoutes.filter(route => route.id !== selectedRouteId));
        setSelectedRouteId(null);
    };

    const handleZoom = (e) => {
        e.preventDefault();
        const newZoom = Math.max(0.5, Math.min(zoom + e.deltaY * -0.001, 3));
        setZoom(newZoom);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setOffset({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };


    const difficultyColors = [
        { color: '#ffffff', name: '1' },
        { color: '#ffff00', name: '2' },
        { color: '#ffa500', name: '3' },
        { color: '#ff0000', name: '4' },
        { color: '#800080', name: '5' },
        { color: '#0000ff', name: '6' },
        { color: '#8b4513', name: '7' }
    ];

    return (
        <div className="route-editor-container">
            <svg
                width="100%"
                height="400"
                viewBox="0 0 500 400"

                onClick={handleSvgClick}
                onWheel={handleZoom}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >

                <rect x="0" y="0" width="500" height="400" fill="#f0f0f0" />

                <g transform={`translate(${offset.x}, ${offset.y}) scale(${zoom})`}>
                    {routes.map((route) => (
                        <circle
                            key={route.id}
                            cx={route.x}
                            cy={route.y}
                            r="10"
                            fill={route.color}
                            stroke={selectedRouteId === route.id ? 'black' : 'none'}
                            strokeWidth={selectedRouteId === route.id ? 2 : 0}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRouteId(route.id === selectedRouteId ? null : route.id);
                                setNewRoute(route);
                            }}
                        />
                    ))}

                    {newRoute.id && (
                        <circle
                            cx={newRoute.x}
                            cy={newRoute.y}
                            r="10"
                            fill={newRoute.color}
                        />
                    )}
                </g>
            </svg>

            {newRoute.id && (
                <div className="route-form mt-3">
                    <h5>New route</h5>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="difficulty" className="form-label">Difficulty</label>
                            <input
                                type="text"
                                className="form-control"
                                id="difficulty"
                                value={newRoute.difficulty}
                                onChange={(e) => setNewRoute({ ...newRoute, difficulty: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="author" className="form-label">Autor</label>
                            <input
                                type="text"
                                className="form-control"
                                id="author"
                                value={newRoute.author}
                                onChange={(e) => setNewRoute({ ...newRoute, author: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Route colour</label>
                            <div className="d-flex justify-content-between">
                                {difficultyColors.map((difficulty) => (
                                    <button
                                        key={difficulty.name}
                                        type="button"
                                        className="btn"
                                        style={{
                                            backgroundColor: difficulty.color,
                                            borderColor: 'silver',
                                            borderWidth: '2px',
                                            borderStyle: 'solid',
                                            width: '30px',
                                            height: '30px',
                                            margin: '0 2px'
                                        }}
                                        onClick={() => setNewRoute({ ...newRoute, color: difficulty.color })}
                                    />
                                ))}
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={saveRoute}>Save route</button>
                    </form>
                </div>
            )}

            {selectedRouteId && (
                <button className="btn btn-danger mt-2" onClick={deleteRoute}>
                    Delete route
                </button>
            )}
        </div>
    );
}

export default GymRouteEditor;

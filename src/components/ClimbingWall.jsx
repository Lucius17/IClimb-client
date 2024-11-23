import React, { useState, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Rating from 'react-rating-stars-component';
import 'bootstrap/dist/css/bootstrap.min.css';

const routes = [
  { id: 1, label: '5A', color: 'red', x: '20%', y: '30%', description: 'Trudna trasa dla zaawansowanych.', comments: 'Wymaga sporej siły', rating: 4 },
  { id: 2, label: '6B', color: 'blue', x: '50%', y: '60%', description: 'Średnio zaawansowana trasa.', comments: 'Fajna na rozgrzewkę', rating: 3 },
  { id: 3, label: '7C', color: 'green', x: '80%', y: '40%', description: 'Ekstremalnie trudna, dla profesjonalistów.', comments: 'Prawdziwe wyzwanie!', rating: 5, },
];

const ClimbingWall = () => {
  const [show, setShow] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [scale, setScale] = useState(1);
  const wallRef = useRef(null);

  // Funkcja obsługująca kliknięcie na kropkę
  const handleMarkerClick = (route) => {
    setSelectedRoute(route);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  // Funkcja do obsługi pinch-zoom
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      setInitialDistance(getDistance(e));
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const newDistance = getDistance(e);
      if (initialDistance) {
        const zoomFactor = newDistance / initialDistance;
        setScale(prevScale => prevScale * zoomFactor);
        setInitialDistance(newDistance);
      }
    }
  };

  const getDistance = (e) => {
    const x1 = e.touches[0].pageX;
    const y1 = e.touches[0].pageY;
    const x2 = e.touches[1].pageX;
    const y2 = e.touches[1].pageY;
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  };

  return (
    <div
      ref={wallRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '500px',
        backgroundImage: 'url("/path/to/your/wall-image.jpg")',
        backgroundSize: 'cover',
        border: '1px solid #ccc',
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        touchAction: 'none',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {routes.map((route) => (
        <div
          key={route.id}
          onClick={() => handleMarkerClick(route)}
          style={{
            position: 'absolute',
            top: route.y,
            left: route.x,
            backgroundColor: route.color,
            color: '#fff',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {route.label}
        </div>
      ))}

      {selectedRoute && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Trasa: {selectedRoute.label}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Opis:</strong> {selectedRoute.description}</p>
            <p><strong>Komentarze:</strong> {selectedRoute.comments}</p>
            <div>
              <strong>Ocena:</strong>
              <Rating value={selectedRoute.rating} count={5} size={24} activeColor="#ffd700" edit={false} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Zamknij
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ClimbingWall;

import React, { useState, useRef, useLayoutEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Rating from 'react-rating-stars-component';
import 'bootstrap/dist/css/bootstrap.min.css';

const routes = [
  { id: 1, label: '5A', color: 'red', x: '20%', y: '30%', description: 'Trudna trasa dla zaawansowanych.', comments: 'Wymaga sporej siły', rating: 4 },
  { id: 2, label: '6B', color: 'blue', x: '50%', y: '60%', description: 'Średnio zaawansowana trasa.', comments: 'Fajna na rozgrzewkę', rating: 3 },
  { id: 3, label: '7C', color: 'green', x: '80%', y: '40%', description: 'Ekstremalnie trudna, dla profesjonalistów.', comments: 'Prawdziwe wyzwanie!', rating: 5 },
];

const ClimbingWall = () => {
  const [show, setShow] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [svgContent, setSvgContent] = useState('');
  const svgContainerRef = useRef(null);
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  // Wczytanie SVG i obliczenie wymiarów po jego załadowaniu
  useLayoutEffect(() => {
    fetch('/wall.svg')
      .then((response) => response.text())
      .then((data) => {
        setSvgContent(data);

        // Obliczanie wymiarów SVG po jego załadowaniu
        const svgContainer = svgContainerRef.current;
        if (svgContainer) {
          const { width, height } = svgContainer.getBoundingClientRect();
          setSvgDimensions({ width, height });
        }
      })
      .catch((error) => console.error('Error loading SVG:', error));
  }, []);

  const handleMarkerClick = (route) => {
    setSelectedRoute(route);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <>
      {/* Renderowanie SVG */}
      <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
        <div
          ref={svgContainerRef}
          dangerouslySetInnerHTML={{ __html: svgContent }}
          style={{
            width: '100%',
            height: 'auto',
            position: 'relative',
            maxWidth: '100%',
          }}
        />

        {/* Markery na trasach */}
        <svg
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none', // Markery nie będą zakłócać interakcji z obrazkiem SVG
          }}
        >
          {routes.map((route) => (
            <g
              key={route.id}
              onClick={() => handleMarkerClick(route)}
              style={{
                pointerEvents: 'auto', // Dodajemy pointer-events auto, żeby markery były klikalne
              }}
            >
              <circle
                cx={`${route.x}`}
                cy={`${route.y}`}
                r="15"
                fill={route.color}
                style={{
                  cursor: 'pointer',
                }}
              />
              <text
                x={`${route.x}`}
                y={`${route.y}`}
                fontSize="10"
                textAnchor="middle"
                fill="white"
                fontWeight="bold"
                dy="4" // Dostosowanie tekstu względem okręgu
              >
                {route.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Modal z informacjami */}
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
    </>
  );
};

export default ClimbingWall;

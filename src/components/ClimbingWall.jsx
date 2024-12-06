import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Rating from 'react-rating-stars-component';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import 'bootstrap/dist/css/bootstrap.min.css';

const routes = [
  { id: 1, label: '5A', color: 'red', x: 0.2, y: 0.3, description: 'Trudna trasa dla zaawansowanych.', comments: 'Wymaga sporej siły', rating: 4 },
  { id: 2, label: '6B', color: 'blue', x: 0.5, y: 0.6, description: 'Średnio zaawansowana trasa.', comments: 'Fajna na rozgrzewkę', rating: 3 },
  { id: 3, label: '7C', color: 'green', x: 0.8, y: 0.4, description: 'Ekstremalnie trudna, dla profesjonalistów.', comments: 'Prawdziwe wyzwanie!', rating: 5 },
];

const ClimbingWall = () => {
  const [show, setShow] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [svgContent, setSvgContent] = useState('');
  const svgRef = useRef(null);
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  // Załadowanie SVG
  useLayoutEffect(() => {
    fetch('/wall.svg')
      .then((response) => response.text())
      .then((data) => setSvgContent(data))
      .catch((error) => console.error('Error loading SVG:', error));
  }, []);

  // Ustalamy wymiary SVG po załadowaniu komponentu
  useEffect(() => {
    const svg = svgRef.current;
    if (svg) {
      setSvgDimensions({ width: svg.viewBox.baseVal.width, height: svg.viewBox.baseVal.height });
    }
  }, [svgContent]);

  // Obsługa kliknięcia w marker
  const handleMarkerClick = (route) => {
    setSelectedRoute(route);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  // Funkcja ograniczająca pozycje markerów, by nie wychodziły poza wymiary SVG
  const getClampedPosition = (coord, dimension) => {
    return Math.max(0, Math.min(coord, dimension)); // Zapewnia, że współrzędna będzie w przedziale [0, dimension]
  };

  return (
    <>
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={4}
        centerContent
      >
        <TransformComponent>
          <svg
            ref={svgRef}
            viewBox="0 0 582.24 842.89"
            preserveAspectRatio="xMidYMid meet"  // Zachowuje proporcje przy skalowaniu
            style={{
              width: '100vw',  // Wypełnia całą szerokość ekranu
              height: '100vh', // Wypełnia całą wysokość ekranu
              position: 'relative',
            }}
          >
            {/* Renderowanie SVG tła */}
            <g dangerouslySetInnerHTML={{ __html: svgContent }} />

            {/* Markery */}
            {routes.map((route) => {
              // Przekształcenie pozycji markerów do odpowiednich wymiarów SVG
              const markerX = getClampedPosition(route.x * svgDimensions.width, svgDimensions.width); 
              const markerY = getClampedPosition(route.y * svgDimensions.height, svgDimensions.height);

              return (
                <g
                  key={route.id}
                  onClick={() => handleMarkerClick(route)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle
                    cx={markerX}
                    cy={markerY}
                    r="15"
                    fill={route.color}
                    stroke="black"
                    strokeWidth="2"
                  />
                  <text
                    x={markerX}
                    y={markerY + 4}
                    fontSize="12"
                    textAnchor="middle"
                    fill="white"
                    fontWeight="bold"
                  >
                    {route.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </TransformComponent>
      </TransformWrapper>

      {/* Modal */}
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

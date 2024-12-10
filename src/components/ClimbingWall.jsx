import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Modal, Button, Offcanvas, Form } from 'react-bootstrap';
import Rating from 'react-rating-stars-component';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import 'bootstrap/dist/css/bootstrap.min.css';

const routes = [
  { id: 1, label: '5A', color: 'red', x: 0.2, y: 0.3, difficulty: 'easy', description: 'Trudna trasa dla zaawansowanych.', comments: 'Wymaga sporej siły', rating: 4 },
  { id: 2, label: '6B', color: 'blue', x: 0.5, y: 0.6, difficulty: 'medium', description: 'Średnio zaawansowana trasa.', comments: 'Fajna na rozgrzewkę', rating: 3 },
  { id: 3, label: '7C', color: 'green', x: 0.8, y: 0.4, difficulty: 'hard', description: 'Ekstremalnie trudna, dla profesjonalistów.', comments: 'Prawdziwe wyzwanie!', rating: 5 },
];

const ClimbingWall = () => {
  const [show, setShow] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [svgContent, setSvgContent] = useState('');
  const [filteredDifficulty, setFilteredDifficulty] = useState('');
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);
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
    return Math.max(0, Math.min(coord, dimension));
  };

  // Obsługa filtrowania
  const handleDifficultyFilter = (difficulty) => {
    setFilteredDifficulty(difficulty);
  };

  const filteredRoutes = filteredDifficulty
    ? routes.filter((route) => route.difficulty === filteredDifficulty)
    : routes;

  return (
    <>
      {/* Boczne menu */}
      <Button
        variant="primary"
        onClick={() => setIsSidenavOpen(true)}
        style={{ position: 'fixed', top: 10, left: 10, zIndex: 1000 }}
      >
        ☰ Filtry
      </Button>

      <Offcanvas show={isSidenavOpen} onHide={() => setIsSidenavOpen(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filtry</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group>
              <Form.Label>Poziom trudności</Form.Label>
              <Form.Select
                value={filteredDifficulty}
                onChange={(e) => handleDifficultyFilter(e.target.value)}
              >
                <option value="">Wszystkie</option>
                <option value="easy">Łatwe</option>
                <option value="medium">Średnie</option>
                <option value="hard">Trudne</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
              preserveAspectRatio="xMidYMid meet"
              style={{
                width: '100vw',
                height: '100vh',
                position: 'relative',
              }}
            >
              <g dangerouslySetInnerHTML={{ __html: svgContent }} />

              {filteredRoutes.map((route) => {
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
      </div>

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

import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditableClimbingWall = () => {
  const [routes, setRoutes] = useState([
    { id: 1, label: '5A', color: 'red', x: 0.2, y: 0.3, description: 'Trudna trasa dla zaawansowanych.', comments: 'Wymaga sporej siły', rating: 4 },
    { id: 2, label: '6B', color: 'blue', x: 0.5, y: 0.6, description: 'Średnio zaawansowana trasa.', comments: 'Fajna na rozgrzewkę', rating: 3 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [svgContent, setSvgContent] = useState('');
  const svgRef = useRef(null);
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  // Load SVG background
  useLayoutEffect(() => {
    fetch('/wall.svg')
      .then((response) => response.text())
      .then((data) => setSvgContent(data))
      .catch((error) => console.error('Error loading SVG:', error));
  }, []);

  // Get SVG dimensions
  useEffect(() => {
    const svg = svgRef.current;
    if (svg) {
      setSvgDimensions({ width: svg.viewBox.baseVal.width, height: svg.viewBox.baseVal.height });
    }
  }, [svgContent]);

  // Handle adding a new route
  const handleAddRoute = (event) => {
    const rect = svgRef.current.getBoundingClientRect();
    const newRoute = {
      id: Date.now(),
      label: 'New',
      color: 'gray',
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
      description: '',
      comments: '',
      rating: 0,
    };
    setRoutes([...routes, newRoute]);
    setSelectedRoute(newRoute);
    setShowModal(true);
  };

  const handleMarkerClick = (route) => {
    setSelectedRoute(route);
    setShowModal(true);
  };

  const handleSaveRoute = () => {
    setRoutes((prevRoutes) =>
      prevRoutes.map((route) => (route.id === selectedRoute.id ? selectedRoute : route))
    );
    setShowModal(false);
  };

  const handleDeleteRoute = (id) => {
    setRoutes(routes.filter((route) => route.id !== id));
    setShowModal(false);
  };

  const getClampedPosition = (coord, dimension) => {
    return Math.max(0, Math.min(coord, dimension));
  };

  return (
    <>


      <TransformWrapper
  initialScale={1}
  minScale={0.005}
  maxScale={4}
  doubleClick={{ disabled: true }} // Disable zoom on double-click
>
  <TransformComponent>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <svg
        ref={svgRef}
        viewBox="0 0 582.24 842.89"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '80vw', height: 'auto', position: 'relative' }}
        onDoubleClick={handleAddRoute}
      >
        <g dangerouslySetInnerHTML={{ __html: svgContent }} />

        {routes.map((route) => {
          const markerX = route.x * svgDimensions.width;
          const markerY = route.y * svgDimensions.height;

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
    </div>
  </TransformComponent>
</TransformWrapper>



      {selectedRoute && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedRoute.label ? `Edit Route: ${selectedRoute.label}` : 'New Route'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Label</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedRoute.label}
                  onChange={(e) => setSelectedRoute({ ...selectedRoute, label: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Color</Form.Label>
                <Form.Control
                  type="color"
                  value={selectedRoute.color}
                  onChange={(e) => setSelectedRoute({ ...selectedRoute, color: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedRoute.description}
                  onChange={(e) => setSelectedRoute({ ...selectedRoute, description: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => handleDeleteRoute(selectedRoute.id)}>
              Delete
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveRoute}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default EditableClimbingWall;
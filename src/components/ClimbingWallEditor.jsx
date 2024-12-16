import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import 'bootstrap/dist/css/bootstrap.min.css';

const ClimbingWallEditor = () => {
  const [routes, setRoutes] = useState([
    { id: 1, label: '5A', color: 'red', x: 0.2, y: 0.3, difficulty: 'easy', description: 'Trudna trasa dla zaawansowanych.', comments: [{ text: 'Wymaga sporej siły', nick: 'User1', rating: 4 }], rating: 4 },
    { id: 2, label: '6B', color: 'blue', x: 0.5, y: 0.6, difficulty: 'medium', description: 'Średnio zaawansowana trasa.', comments: [{ text: 'Fajna na rozgrzewkę', nick: 'User2', rating: 3 }], rating: 3 },
    { id: 3, label: '7C', color: 'green', x: 0.8, y: 0.4, difficulty: 'hard', description: 'Ekstremalnie trudna, dla profesjonalistów.', comments: [{ text: 'Prawdziwe wyzwanie!', nick: 'User3', rating: 5 }], rating: 5 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [svgContent, setSvgContent] = useState('');
  const svgRef = useRef(null);
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    fetch('/wall.svg')
      .then((response) => response.text())
      .then((data) => setSvgContent(data))
      .catch((error) => console.error('Error loading SVG:', error));
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (svg) {
      setSvgDimensions({ width: svg.viewBox.baseVal.width, height: svg.viewBox.baseVal.height });
    }
  }, [svgContent]);

  const handleAddRoute = (event) => {
    const rect = svgRef.current.getBoundingClientRect();
    const newRoute = {
      id: Date.now(),
      label: 'New',
      color: 'gray',
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
      description: '',
      comments: [],
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

  const handleDeleteComment = (commentIndex) => {
    setSelectedRoute((prevRoute) => {
      const updatedComments = [...prevRoute.comments];
      updatedComments.splice(commentIndex, 1);
      return { ...prevRoute, comments: updatedComments };
    });
  };

  const getClampedPosition = (coord, dimension) => {
    return Math.max(0, Math.min(coord, dimension));
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <TransformWrapper
          initialScale={1}
          minScale={0.005}
          maxScale={4}
          limitToBounds={false}
          doubleClick={{ disabled: true }}
        >
          <TransformComponent>
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
          </TransformComponent>
        </TransformWrapper>
      </div>

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

            <hr />

            <h5>Comments</h5>
            <ListGroup>
              {selectedRoute.comments.map((comment, index) => (
                <ListGroup.Item key={index}>
                  <strong>{comment.nick}</strong>: {comment.text} ({comment.rating}/5)
                  <Button
                    variant="danger"
                    size="sm"
                    style={{ float: 'right' }}
                    onClick={() => handleDeleteComment(index)}
                  >
                    Delete
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
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

export default ClimbingWallEditor;
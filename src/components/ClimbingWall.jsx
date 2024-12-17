import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Modal, Button, Offcanvas, Form } from 'react-bootstrap';
import Rating from 'react-rating-stars-component';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import 'bootstrap/dist/css/bootstrap.min.css';

const routes = [
  { id: 1, label: '5A', color: 'red', x: 0.2, y: 0.3, description: 'Trudna trasa dla zaawansowanych.', comments: [{ text: 'Wymaga sporej siły', nick: 'User1', rating: 4 }], rating: 4 },
  { id: 2, label: '6B', color: 'blue', x: 0.5, y: 0.6, description: 'Średnio zaawansowana trasa.', comments: [{ text: 'Fajna na rozgrzewkę', nick: 'User2', rating: 3 }], rating: 3 },
  { id: 3, label: '7C', color: 'green', x: 0.8, y: 0.4, description: 'Ekstremalnie trudna, dla profesjonalistów.', comments: [{ text: 'Prawdziwe wyzwanie!', nick: 'User3', rating: 5 }], rating: 5 },
];

// Mapowanie etykiety na kategorię
const getDifficultyCategory = (label) => {
  const labelValue = label.toUpperCase();
  if (['1', '2', '3', '4', '5A', '5B', '5C', '6A'].includes(labelValue)) return 'Beginner';
  if (['6A+', '6B', '6B+', '6C', '6C+', '7A', '7A+'].includes(labelValue)) return 'Intermediate';
  if (['7B', '7B+', '7C', '7C+', '8A', '8A+'].includes(labelValue)) return 'Advanced';
  if (['8B', '8B+', '8C', '8C+', '9A', '9A+', '9B', '9B+', '9C', '9C+'].includes(labelValue)) return 'Pro';
  return null;
};

const ClimbingWall = () => {
  const [show, setShow] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [svgContent, setSvgContent] = useState('');
  const [filteredCategory, setFilteredCategory] = useState('');
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newNick, setNewNick] = useState('');
  const [newRating, setNewRating] = useState(0);
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

  const handleMarkerClick = (route) => {
    setSelectedRoute(route);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const getClampedPosition = (coord, dimension) => {
    return Math.max(0, Math.min(coord, dimension));
  };

  const handleCategoryFilter = (category) => {
    setFilteredCategory(category);
  };

  const handleAddComment = () => {
    if (newComment.trim() && newNick.trim() && selectedRoute) {
      const newCommentObject = { text: newComment.trim(), nick: newNick.trim(), rating: newRating };
      setSelectedRoute((prev) => ({
        ...prev,
        comments: [...prev.comments, newCommentObject],
      }));
      setNewComment('');
      setNewNick('');
      setNewRating(0);
    }
  };

  const filteredRoutes = filteredCategory
    ? routes.filter((route) => getDifficultyCategory(route.label) === filteredCategory)
    : routes;

  return (
    <>
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
              <Form.Label>Difficulty</Form.Label>
              <Form.Select
                value={filteredCategory}
                onChange={(e) => handleCategoryFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="Beginner">Beginner (1-6a)</option>
                <option value="Intermediate">Intermediate (6a-7a+)</option>
                <option value="Advanced">Advanced (7b-8b)</option>
                <option value="Pro">Pro (8b+-9b+)</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <TransformWrapper initialScale={1} minScale={0.5} maxScale={4} centerContent>
          <TransformComponent>
            <svg
              ref={svgRef}
              viewBox="0 0 582.24 842.89"
              preserveAspectRatio="xMidYMid meet"
              style={{ width: '100vw', height: '100vh', position: 'relative' }}
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

      {selectedRoute && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Trasa: {selectedRoute.label}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Opis:</strong> {selectedRoute.description}</p>
            <p><strong>Komentarze:</strong></p>
            <ul>
              {selectedRoute.comments.map((comment, index) => (
                <li key={index}>
                  <strong>{comment.nick}:</strong> {comment.text}
                  <Rating value={comment.rating} count={5} size={16} activeColor="#ffd700" edit={false} />
                </li>
              ))}
            </ul>
            <Form>
              <Form.Group className="mt-3">
                <Form.Label>Komentarz</Form.Label>
                <Form.Control
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Wpisz swój komentarz"
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Ocena</Form.Label>
                <Rating
                  value={newRating}
                  count={5}
                  size={24}
                  activeColor="#ffd700"
                  onChange={(value) => setNewRating(value)}
                />
              </Form.Group>
              <Button className="mt-2" variant="primary" onClick={handleAddComment}>
                Dodaj komentarz
              </Button>
            </Form>
            <div className="mt-3">
              <strong>Średnia ocena:</strong>
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

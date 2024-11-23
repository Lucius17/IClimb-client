import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditRouteModal = ({ route, show, handleClose, handleSave }) => {
  const [editedRoute, setEditedRoute] = useState({ ...route });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRoute((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleColorChange = (e) => {
    setEditedRoute((prevState) => ({
      ...prevState,
      color: e.target.value,
    }));
  };

  const handleSubmit = () => {
    handleSave(editedRoute);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edytuj trasę: {route.label}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="routeLabel">
            <Form.Label>Etykieta trasy (np. 5A, 6B)</Form.Label>
            <Form.Control
              type="text"
              name="label"
              value={editedRoute.label}
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group controlId="routeColor">
            <Form.Label>Kolor trasy</Form.Label>
            <Form.Control
              type="color"
              name="color"
              value={editedRoute.color}
              onChange={handleColorChange}
            />
          </Form.Group>
          
          <Form.Group controlId="routeDescription">
            <Form.Label>Opis</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={editedRoute.description}
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group controlId="routeComments">
            <Form.Label>Komentarze</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="comments"
              value={editedRoute.comments}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Anuluj
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Zapisz zmiany
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditRouteModal;

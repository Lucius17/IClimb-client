import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import EditRouteModal from './EditRouteModal'; // Importujemy komponent do edytowania tras
import Rating from 'react-rating-stars-component';
import 'bootstrap/dist/css/bootstrap.min.css';

const routes = [
  { id: 1, label: '5A', color: 'red', x: '20%', y: '30%', description: 'Trudna trasa dla zaawansowanych.', comments: 'Wymaga sporej siły', rating: 4 },
  { id: 2, label: '6B', color: 'blue', x: '50%', y: '60%', description: 'Średnio zaawansowana trasa.', comments: 'Fajna na rozgrzewkę', rating: 3 },
  { id: 3, label: '7C', color: 'green', x: '80%', y: '40%', description: 'Ekstremalnie trudna, dla profesjonalistów.', comments: 'Prawdziwe wyzwanie!', rating: 5 },
];

const ClimbingWallEditor = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleMarkerClick = (route) => {
    setSelectedRoute(route);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedRoute(null);
  };

  const handleSaveEditedRoute = (updatedRoute) => {
    // Zaktualizuj trasę w bazie danych lub w stanie
    console.log('Zapisano zaktualizowaną trasę:', updatedRoute);
    // Można tu dodać logikę do aktualizacji stanu aplikacji lub wysyłania danych na serwer
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '500px', backgroundImage: 'url("/path/to/your/wall-image.jpg")', backgroundSize: 'cover', border: '1px solid #ccc' }}>
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
        <EditRouteModal
          route={selectedRoute}
          show={showEditModal}
          handleClose={handleCloseEditModal}
          handleSave={handleSaveEditedRoute}
        />
      )}
    </div>
  );
};

export default ClimbingWallEditor;

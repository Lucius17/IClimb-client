import React from 'react';
import { useNavigate } from 'react-router-dom'; // Zamiast useHistory
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const BackButton = () => {
  const navigate = useNavigate(); // Użyj useNavigate zamiast useHistory

  const handleBack = () => {
    window.location.href = '/'; // Przejdź do poprzedniej strony
  };

  return (
    <button
      onClick={handleBack}
	  className="btn btn-primary text-center"
      style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
      }}
    >
      <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '8px' }} /> {/* Ikona strzałki w lewo */}
      
    </button>
  );
};

export default BackButton;
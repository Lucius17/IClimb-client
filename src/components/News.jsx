import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill'; // Użyj ReactQuill zamiast Quill
import 'react-quill/dist/quill.snow.css'; // Import CSS Quill
import Menu from './Menu.jsx';
import BackButton from './BackButton.jsx';

function News() {
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  const newsItems = [
    {
      title: 'New Gym Opening in Warsaw!',
      description: 'A brand new gym has opened in Warsaw with state-of-the-art equipment.',
      imageUrl: 'https://via.placeholder.com/100',
      fullContent: '<p>Full details about the new gym opening in Warsaw...</p>',
    },
    {
      title: 'Climbing Event This Weekend',
      description: 'Join us for a fun climbing event happening this weekend!',
      imageUrl: 'https://via.placeholder.com/100',
      fullContent: '<p>Full details about the climbing event happening this weekend...</p>',
    },
    {
      title: 'Fitness Classes Starting Soon',
      description: 'Our new fitness classes are starting next week. Sign up today!',
      imageUrl: 'https://via.placeholder.com/100',
      fullContent: '<p>Full details about the upcoming fitness classes...</p>',
    },
  ];

  const handleNewsClick = (news) => {
    setSelectedNews(news);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNews(null);
  };

  return (
    
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        {newsItems.map((news, index) => (
          <div
            key={index}
            className="news-item d-flex mb-3"
            style={{ alignItems: 'center', cursor: 'pointer' }}
            onClick={() => handleNewsClick(news)}
          >
            {/* <img
              src={news.imageUrl}
              alt={news.title}
              className="news-image me-3"
              style={{ width: '100px', height: '100px' }}
            /> */}
            <div>
              <h5>{news.title}</h5>
              <p>{news.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Menu component at the bottom */}
      <Menu />
      <BackButton />

      {/* Modal to show full news */}
      {selectedNews && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedNews.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Użyj ReactQuill do wyświetlania treści */}
            <ReactQuill
              value={selectedNews.fullContent}
              readOnly
              theme="bubble" // Możesz zmienić temat na 'bubble' lub 'snow'
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default News;

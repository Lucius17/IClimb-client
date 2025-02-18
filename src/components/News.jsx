import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill'; // Użyj ReactQuill zamiast Quill
import 'react-quill/dist/quill.snow.css'; // Import CSS Quill
import Menu from './Menu.jsx';
import BackButton from './BackButton.jsx';
import api from '/src/api.js';

function News() {
  const { gymId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get(`/gyms/${gymId}/news`);
        setNewsItems(response.data); // Axios automatically parses JSON
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [gymId]);

  const handleNewsClick = (news) => {
    setSelectedNews(news);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNews(null);
  };

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>Error: {error}</p>;

  return (

      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          {newsItems.length === 0 ? (
              <p>No news available for this gym.</p>
          ) : (
              newsItems.map((news, index) => (
                  <div
                      key={index}
                      className="border rounded text-center conainer my-4"
                      style={{ alignItems: 'center', cursor: 'pointer', textAlign: 'center' }}
                      onClick={() => handleNewsClick(news)}
                  >
                    {/* <img
              src={news.imageUrl}
              alt={news.title}
              className="news-image me-3"
              style={{ width: '100px', height: '100px' }}
            /> */}
                    <div className='conainer'>
                      <h5>{news.title}</h5>
                      <p>{news.description}</p>
                    </div>
                  </div>
              ))
          )}
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

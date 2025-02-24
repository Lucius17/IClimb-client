import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Menu from './Menu.jsx';
import api from  '/src/api.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function UserLocationMarker({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [position, map]);

  return position ? (
    <CircleMarker
      center={position}
      pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.5 }}
      radius={10}
    >
      <Popup>To Twoja lokalizacja!</Popup>
    </CircleMarker>
  ) : null;
}

function CenterMapOnMarker({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [position, map]);

  return null;
}

function MapView({ height = '100vh' }) {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    api.get('/gyms/Gym')
        .then((response) => {
          const gymData = response.data;
          const formattedMarkers = gymData
              .filter((gym) => gym.position && gym.position.lat && gym.position.lng)
              .map((gym) => ({
                id: gym._id,
                position: [gym.position.lat, gym.position.lng],
                name: gym.name,
              }));
          setMarkers(formattedMarkers);
        })
        .catch((error) => {
          console.error("Error fetching gym data:", error);
        });
  }, []);

const filteredMarkers = searchQuery
  ? markers.filter(marker =>
      marker.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : markers;

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleSearchResultClick = (marker) => {
    setSelectedMarker(marker);
    setSearchQuery(marker.name);
  };

    const handleSelectGym = async (gymId) => {
        try {
            const response = await api.put('/users/me', { gym: gymId });
            alert(`${response.data.message || 'Gym selected successfully!'}`);
        } catch (error) {
            console.error('Error updating gym:', error);
            alert('Failed to select gym. Please try again.');
        }
    };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          console.error("Nie udało się uzyskać lokalizacji użytkownika.");
        }
      );
    }
  }, []);

  return (
    <div style={{ height, position: 'relative' }}>
      <div style={{ position: 'absolute', top: 10, left: 50, zIndex: 1000 }}>
        <div className="input-group">
          <span className="input-group-text">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Szukaj obiektu sportowego..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div style={{ background: 'black', maxHeight: '200px', overflowY: 'auto' }}>
          {searchQuery && filteredMarkers.map(marker => (
            <div
              key={marker.id}
              style={{ cursor: 'pointer', padding: '5px' }}
              onClick={() => handleSearchResultClick(marker)}
            >
              {marker.name}
            </div>
          ))}
        </div>
      </div>
      <MapContainer center={[52.2297, 21.0122]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {userLocation && <UserLocationMarker position={userLocation} />}
        {filteredMarkers.map(marker => (
          <Marker key={marker.id} position={marker.position} eventHandlers={{ click: () => handleMarkerClick(marker) }}>
            {selectedMarker === marker && (
              <Popup position={marker.position}>
                  <div>
                      <p>{marker.name}</p>
                      <button
                          className="btn btn-primary"
                          onClick={() => handleSelectGym(marker.id)}
                      >
                          Select
                      </button>
                  </div>
              </Popup>
            )}
          </Marker>
        ))}
          {selectedMarker && <CenterMapOnMarker position={selectedMarker.position} />}
      </MapContainer>
      <Menu />
    </div>
  );
}

export default MapView;

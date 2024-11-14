import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Menu from './Menu.jsx';
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
  const [markers, setMarkers] = useState([
    { id: 1, position: [52.2297, 21.0122], name: "Siłownia A" },
    { id: 2, position: [52.2307, 21.0132], name: "Siłownia B" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

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
                  <button className="btn btn-primary" onClick={() => alert(`${marker.name} wybrana!`)}>
                    Wybierz
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

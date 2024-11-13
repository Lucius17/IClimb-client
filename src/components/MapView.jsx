import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Menu from './Menu.jsx';

function UserLocationMarker({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 13);  // Ustawiamy środek mapy na lokalizację użytkownika
    }
  }, [position, map]);

  return position ? (
    <CircleMarker
      center={position}
      pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.5 }}
      radius={10}  // Rozmiar kółka
    >
      <Popup>To Twoja lokalizacja!</Popup>
    </CircleMarker>
  ) : null;
}

function MapView({ height = '100vh' }) {
  const [userLocation, setUserLocation] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleMarkerClick = () => {
    setShowPopup(true);
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
      <MapContainer center={[52.2297, 21.0122]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {userLocation && <UserLocationMarker position={userLocation} />}
        <Marker position={[52.2297, 21.0122]} eventHandlers={{ click: handleMarkerClick }}>
          {showPopup && (
            <Popup position={[52.2297, 21.0122]}>
              <div>
                <p>Wybierz tę siłownię</p>
                <button className="btn btn-primary" onClick={() => alert("Siłownia wybrana!")}>
                  Wybierz
                </button>
                <button className="btn btn-secondary" onClick={() => setShowPopup(false)}>
                  Anuluj
                </button>
              </div>
            </Popup>
          )}
        </Marker>
      </MapContainer>
      <Menu />
    </div>
  );
}

export default MapView;

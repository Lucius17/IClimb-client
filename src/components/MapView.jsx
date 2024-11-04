import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Menu from './Menu.jsx';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: markerShadowPng,
  shadowSize: [41, 41]
});

function MapView({ height = '100vh' }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleMarkerClick = () => {
    setShowPopup(true);
  };

  return (
      <div style={{ height, position: 'relative' }}>
        <MapContainer center={[52.2297, 21.0122]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[52.2297, 21.0122]} icon={customIcon} eventHandlers={{ click: handleMarkerClick }}>
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

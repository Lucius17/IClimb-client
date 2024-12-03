import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';



function Info() {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState([51.505, -0.09]);
  const [hours, setHours] = useState({
    monday: { open: '', close: '' },
    tuesday: { open: '', close: '' },
    wednesday: { open: '', close: '' },
    thursday: { open: '', close: '' },
    friday: { open: '', close: '' },
    saturday: { open: '', close: '' },
    sunday: { open: '', close: '' },
  });

  const [price, setPrice] = useState('');
  const [priceWithMultisport, setPriceWithMultisport] = useState('');
  const [gymMembership, setGymMembership] = useState('');

  const handleSave = () => {
    alert(
      `Address: ${address}, Coordinates: ${coordinates}, Hours: ${JSON.stringify(
        hours
      )}, Price: ${price}, Price With Multisport: ${priceWithMultisport}, Gym Membership: ${gymMembership}`
    );
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setCoordinates([e.latlng.lat, e.latlng.lng]);
      },
    });
    return coordinates ? <Marker position={coordinates}></Marker> : null;
  };

  return (
    <div>
      <h2>Info</h2>

      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          className="form-control"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Opening Hours</label>
        {Object.keys(hours).map((day) => (
          <div key={day} className="mb-3">
            <label>{day.charAt(0).toUpperCase() + day.slice(1)}:</label>
            <div className="d-flex align-items-center">
              <input
                type="time"
                className="form-control me-2"
                value={hours[day].open}
                onChange={(e) =>
                  setHours({
                    ...hours,
                    [day]: { ...hours[day], open: e.target.value },
                  })
                }
              />
              <span className="mx-1">to</span>
              <input
                type="time"
                className="form-control"
                value={hours[day].close}
                onChange={(e) =>
                  setHours({
                    ...hours,
                    [day]: { ...hours[day], close: e.target.value },
                  })
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Price With Multisport</label>
        <input
          type="number"
          className="form-control"
          value={priceWithMultisport}
          onChange={(e) => setPriceWithMultisport(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Gym Membership Price</label>
        <input
          type="number"
          className="form-control"
          value={gymMembership}
          onChange={(e) => setGymMembership(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Map - Click to set coordinates</label>
        <MapContainer center={coordinates} zoom={13} style={{ height: '300px', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker />
        </MapContainer>
      </div>

      <button className="btn btn-primary mt-3" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

export default Info;
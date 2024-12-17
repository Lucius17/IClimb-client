import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import api from '/src/api.js';

function Info() {
  const [address, setAddress] = useState('');
  const { centerId } = useParams();
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

  // Geocoding API function
  const geocodeAddress = async (address) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: address,
          format: 'json',
          addressdetails: 1,
        },
      });
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setCoordinates([parseFloat(lat), parseFloat(lon)]);
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
    }
  };

  useEffect(() => {
    // Fetch gym data
    api.get(`/gyms/Gym/${centerId}`)
      .then((response) => {
        const { address, position, openingHours, price, priceWithMultisport, gymMembership } = response.data;
        
        const defaultHours = {
          monday: { open: '', close: '' },
          tuesday: { open: '', close: '' },
          wednesday: { open: '', close: '' },
          thursday: { open: '', close: '' },
          friday: { open: '', close: '' },
          saturday: { open: '', close: '' },
          sunday: { open: '', close: '' },
        };

        const hoursObject = openingHours.reduce((acc, day) => {
          acc[day.day.toLowerCase()] = { open: day.open, close: day.close };
          return acc;
        }, {});

        if (position && position.lat && position.lng) {
          setCoordinates([position.lat, position.lng]);
        }
        setHours({ ...defaultHours, ...hoursObject });
        setPrice(price || '');
        setPriceWithMultisport(priceWithMultisport || '');
        setGymMembership(gymMembership || '');
        setAddress(response.data.location || '');
      })
      .catch((error) => {
        console.error('Error fetching gym data:', error);
      });
  }, [centerId]);

  // Automatically search for address if not empty
  useEffect(() => {
    if (address && address !== '') {
      geocodeAddress(address);
    }
  }, [address]);

  const handleSave = () => {
    const updatedGymData = {
      address,
      position: {
        lat: coordinates[0],
        lng: coordinates[1],
      },
      openingHours: Object.keys(hours).map((day) => ({
        day: day.charAt(0).toUpperCase() + day.slice(1), // Capitalize day
        open: hours[day].open,
        close: hours[day].close,
      })),
      price,
      priceWithMultisport,
      gymMembership,
    };

    api.put(`/gyms/Gym/${centerId}`, updatedGymData)
      .then((response) => {
        alert('Gym updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating gym:', error);
        alert('Failed to update gym. Please try again.');
      });
  };

  const LocationMarker = () => {
    useMap(); // This hook allows access to the map instance
    return coordinates ? <Marker position={coordinates}></Marker> : null;
  };

  // Component that will update the map center
  const UpdateMapCenter = () => {
    const map = useMap(); // Access map instance
    useEffect(() => {
      if (coordinates) {
        map.setView(coordinates, 13); // Set map center and zoom level
      }
    }, [coordinates, map]);
    return null;
  };

  const handleAddressSearch = async () => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: address,
          format: 'json',
          addressdetails: 1,
          limit: 1,
        },
      });
      const { lat, lon } = response.data[0] || {};
      if (lat && lon) {
        setCoordinates([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert('Address not found!');
      }
    } catch (error) {
      console.error('Error fetching address coordinates:', error);
    }
  };

  return (
    <div>
      <h2>Info</h2>

      <div className="form-group">
        <label>Address</label>
        <div className="d-flex">
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button className="btn btn-secondary ms-2" onClick={handleAddressSearch}>Search</button>
        </div>
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
          <UpdateMapCenter />
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

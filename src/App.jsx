import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Unsigned from './components/Unsigned';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import './App.css';
import MapView from './components/MapView';
import Menu from './components/Menu';
import Profile from './components/Profile';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="container text-center">
        <Routes>
          <Route path="/" element={<Unsigned />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <LogIn onSignIn={handleSignIn} />}
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/" /> : <SignUp />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Navigate to="/" /> : <Profile />}
          />
          <Route
            path="/gym"
            element={isAuthenticated ? <Navigate to="/" /> : <MapView />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      
    <Menu/>
    </Router>
    // tymaczasowe

  );
}

export default App;

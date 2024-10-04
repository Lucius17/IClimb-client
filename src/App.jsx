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
import AdminPanel from './components/AdminPanel';
import SuperAdminPanel from './components/SuperAdminPanel';
import News from './components/News';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Unsigned />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LogIn onSignIn={handleSignIn} />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <SignUp />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/news" element={<News />} />
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="/superadmin" element={<SuperAdminPanel />} />
          <Route path="/admin/:centerId/*" element={<AdminPanel />} />
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

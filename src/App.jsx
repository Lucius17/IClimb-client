import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Unsigned from './components/Unsigned';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import './App.css';
import MapView from './components/MapView';
import Profile from './components/Profile';
import AdminPanel from './components/AdminPanel';
import SuperAdminPanel from './components/SuperAdminPanel';
import News from './components/News';
import GymList from "./components/GymList.jsx";
import ForgotPassword from './components/ForgotPassword.jsx';
import GymOverview from "./components/GymOverview";
import { ThemeProvider } from './ThemeContext';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  return (
      <ThemeProvider>
          <Router>
            <div className={`container ${isDarkMode ? 'dark-mode' : ''}`}>
              <span className="theme-switch" onClick={toggleDarkMode}>
            Switch Theme
          </span>
              <Routes>
                <Route path="/" element={<Unsigned/>}/>
                <Route path="/login" element={isAuthenticated ? <Navigate to="/"/> : <LogIn onSignIn={handleSignIn}/>}/>
                <Route path="/signup" element={isAuthenticated ? <Navigate to="/"/> : <SignUp/>}/>
                <Route path="/map" element={<MapView/>}/>
                <Route path="/gymlist" element={<GymList/>}/>
                <Route path="/gym" element={<GymOverview/>}/>
                <Route path="/news" element={<News/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/admin/*" element={<AdminPanel/>}/>
                <Route path="/superadmin" element={<SuperAdminPanel/>}/>
                <Route path="/admin/:centerId/*" element={<AdminPanel/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="*" element={<Navigate to="/"/>}/>

              </Routes>
            </div>
          </Router>
      </ThemeProvider>
  );
}

export default App;
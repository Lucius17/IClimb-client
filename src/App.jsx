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
import GymDetail   from "./components/GymDetail.jsx";
import { ThemeProvider } from './ThemeContext';
import ClimbingWall from './components/ClimbingWall.jsx';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.body.style.setProperty('--background-color', isDarkMode ? 'white' : '#1e1d1d');
    document.body.style.setProperty('--text-color', isDarkMode ? 'black' : '#f1f1f1');
  };
  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const [routes, setRoutes] = useState([
    { id: 1, x: 50, y: 100, color: '#ff0000', difficulty: '6a', date: '2024-01-01', author: 'Staszek' },
    { id: 2, x: 120, y: 150, color: '#00ff00', difficulty: '6b', date: '2024-02-01', author: 'Mama' },
  ]);
  const svgData = '<svg><!-- SVG content here --></svg>';
  return (
        <Router>
          <div className="container">
            <Routes>
              <Route path="/" element={<Unsigned/>}/>
              <Route path="/login" element={isAuthenticated ? <Navigate to="/"/> : <LogIn onSignIn={handleSignIn}/>}/>
              <Route path="/signup" element={isAuthenticated ? <Navigate to="/"/> : <SignUp/>}/>
              <Route path="/map" element={<MapView/>}/>
              <Route path="/gymlist" element={<GymList/>}/>
              <Route path="/gym" element={<GymOverview/>}/>
              <Route path="/gym/:id" element={<GymDetail svgData={svgData} routes={routes} setRoutes={setRoutes}/>}/>
              <Route path="/news" element={<News/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/test" element={<ClimbingWall/>}/>
              <Route path="/admin/*" element={<AdminPanel/>}/>
              <Route path="/superadmin" element={<SuperAdminPanel/>}/>
              <Route path="/admin/:centerId/*" element={<AdminPanel/>}/>
              <Route path="/forgot-password" element={<ForgotPassword/>}/>
              <Route path="*" element={<Navigate to="/"/>}/>

            </Routes>
          </div>
        </Router>
  );
}

export default App;
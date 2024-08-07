import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Unsigned from './components/Unsigned';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import './App.css';

function App() {
  const [currentComponent, setCurrentComponent] = useState('unsigned');

  const handleSignIn = () => {
    setCurrentComponent('login');
  };

  const handleSignUp = () => {
    setCurrentComponent('signup');
  };

  return (
    <div className="container text-center">
      {currentComponent === 'unsigned' && (
        <Unsigned onSignIn={handleSignIn} onSignUp={handleSignUp} />
      )}
      {currentComponent === 'login' && <LogIn />}
      {currentComponent === 'signup' && <SignUp />}
    </div>
  );
}

export default App;

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse,faDumbbell,faUser } from '@fortawesome/free-solid-svg-icons'


export default function Menu() {
  return (
    
    <div className="fixed-bottom">
    
      <div className="d-flex justify-content-around">
        <Link to="/" className="btn btn-primary w-100 text-center"><FontAwesomeIcon icon={faHouse} /></Link>
        <Link to="/gym" className="btn btn-primary w-100 text-center"><FontAwesomeIcon icon={faDumbbell} /></Link>
        <Link to="/profile" className="btn btn-primary w-100 text-center"><FontAwesomeIcon icon={faUser} /></Link>
      </div>
    </div>
  );
}

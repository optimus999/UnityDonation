import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className={`home ${location.pathname === '/' ? 'active-link' : ''}`}>
        <Link className="dropdown-item" to="/" style={{ color: 'white', fontSize: '1.35vw' }}>
          Home
        </Link>
      </div>
      <div className={`login ${location.pathname === '/login' ? 'active-link' : ''}`}>
        <Link className="dropdown-item" to="/login" style={{ color: 'white', fontSize: '1.35vw' }}>
          Login
        </Link>
      </div>
      <div className={`about ${location.pathname === '/aboutus' ? 'active-link' : ''}`}>
        <Link className="dropdown-item" to="/aboutus" style={{ color: 'white', fontSize: '1.35vw' }}>
          AboutUs
        </Link>
      </div>
      <div className={`register ${location.pathname === '/register' ? 'active-link' : ''}`}>
        <Link className="dropdown-item" to="/register" style={{ color: 'white', fontSize: '1.35vw' }}>
          Register
        </Link>
      </div>
      <div className={`gethelp ${location.pathname === '/gethelp' ? 'active-link' : ''}`}>
        <Link className="dropdown-item" to="/gethelp" style={{ color: 'white', fontSize: '1.35vw' }}>
          GetHelp
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

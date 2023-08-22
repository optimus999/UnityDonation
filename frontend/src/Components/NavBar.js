import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../App.css';
import {Link,useLocation} from 'react-router-dom';
import { UserContext } from "../App";
import {useContext} from 'react';
import { useEffect} from 'react';


const NavBar = () => {
  const {state,dispatch}=useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    const storedPayload = localStorage.getItem("payload");
    if (storedPayload === "true") {
      dispatch({ type: "USER", payload: true });
    }
  }, []);

  const isLinkActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const RenderMenu=()=>{
    const location = useLocation();



  
    if(state)
    {
      return(
        <>
        <div className="navcontent">
          <div className="home"><Link className="dropdown-item" to="/" style={{color:'white',fontSize:'1.35vw'}}>Home</Link></div>
          {/* <div className="login"><Link className="dropdown-item" to="/login" style={{color:'white',fontSize:'1.35vw'}}>Login</Link></div> */}
          <div className="about"><Link className="dropdown-item" to="/about" style={{color:'white',fontSize:'1.35vw'}}>About Me</Link></div>
          {/* <div className="register"><Link className="dropdown-item" to="/register" style={{color:'white',fontSize:'1.35vw'}}>Register</Link></div> */}
          <div className="gethelp"><Link className="dropdown-item" to="/gethelp" style={{color:'white',fontSize:'1.35vw'}}>ContactUs</Link></div>
          <div className="logout"><Link className="dropdown-item" to="/logout" style={{color:'white',fontSize:'1.35vw'}}>Log Out</Link></div>
      </div>
        </>
      )
    }
    else
    {
      return(
        <>
      <div className="navcontent">
          <div className="home"><Link className={`${isLinkActive('/')}`} to="/">
          Home
        </Link></div>
          <div className="login"><Link className={`${isLinkActive('/login')}`} to="/login">Login</Link></div>
          <div className="about"><Link className={`${isLinkActive('/about')}`} to="/about">About Me</Link></div>
          <div className="register"><Link className={`${isLinkActive('/register')}`} to="/register">Register</Link></div>
          <div className="gethelp"><Link className={`${isLinkActive('/gethelp')}`} to="/gethelp">ContactUs</Link></div>
          {/* <div className="logout"><Link className="dropdown-item" to="/logout" style={{color:'white',fontSize:'1.35vw'}}>Log Out</Link></div> */}
      </div>
      </>
      )
    }
  }
    
    return (
      <div>
        <nav  className="navbar navbar-expand-lg navtop" >
  <div className="container-fluid">
    <div className="navbar-brand" to="/"><span className='unity'>Unity</span> <span className='donation'>Donation</span></div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      </ul>
      <RenderMenu/>
    </div>
  </div>
</nav>

      </div>
    );
  }

export default NavBar;

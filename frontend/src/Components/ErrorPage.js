import React from 'react';
import './ErrorPage.css'; 
import {NavLink} from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="error-container">
            <div className="error-content">
                <div className="error-icon">
                    <span>404</span>
                </div>
                <div className="error-details">
                    <h1 className="error-code">Oops!</h1>
                    <p className="error-message">The page you're looking for doesn't exist.</p>
                    <NavLink to='/'>Go Home</NavLink>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;



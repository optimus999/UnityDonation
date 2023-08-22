import React, { useState } from 'react';
import './Popup.css'; 

function Popup({ message }) {
  const [isVisible, setIsVisible] = useState(true);

  const closePopup = () => {
    setIsVisible(false);
  };

  return (
    <div>
      {isVisible && (
        <div className="custom-popup" id="customPopup">
          <div className="popup-content">
            <span className="popup-message" id="popupMessage">
              {message}
            </span>
            <button className="close-button" onClick={closePopup}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup;

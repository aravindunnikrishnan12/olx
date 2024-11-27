import React from 'react';
import './Pop.css'; 

const Popup = ({ message, onClose }) => {
    return (
      <div className="popup-overlay">
        <div className="popup-content">
          <span className="popup-close" onClick={onClose}>&times;</span> {/* Close icon */}
          <p className="popup-message">{message}</p>
        </div>
      </div>
    );
  };

export default Popup;

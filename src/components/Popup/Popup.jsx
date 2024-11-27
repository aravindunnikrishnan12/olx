// src/components/Popup.jsx
import React from 'react';
import './Popup.css'; // Ensure this file contains the new styles

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>×</button>
        <p className="popup-message">{message}</p>
      </div>
    </div>
  );
};

export default Popup;

// src/components/Confirmation/ConfirmationPopup.jsx

import React, { useEffect, useState } from 'react';
import './ConfirmationPopup.css';

function ConfirmationPopup({ message, onConfirm, onCancel }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="popup-overlay">
      <div className={`popup-content ${show ? 'show' : ''}`}>
        <p className="popup-message">{message}</p>
        <div className="popup-buttons">
          <button className="confirm-button" onClick={onConfirm}>OK</button>
          <button className="cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPopup;

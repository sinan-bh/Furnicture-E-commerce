import React from 'react';
import './popup.css'; 

const AlertBox = ({ message, type, onClose }) => {
  return (
    <div className={`alert-box alert-${type}`}>
      <span className="alert-message">{message}</span>
      <button className="alert-close" onClick={onClose}>X</button>
    </div>
  );
};

export default AlertBox;

import React from 'react';
import './popup.css'; 

const ConfirmBox = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirm-box-overlay">
      <div className="confirm-box">
        <p>{message}</p>
        <div className="confirm-box-buttons">
          <button onClick={onConfirm} className="confirm-box-btn confirm">Yes</button>
          <button onClick={onCancel} className="confirm-box-btn cancel">No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;

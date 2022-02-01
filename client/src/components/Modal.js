import React from 'react';

const Modal = ({ onClose, currentPhoto }) => {
    //const {name, category, description, index} = currentPhoto;
    return (
    <div className="modalBackdrop">
    <div className="modalContainer">
      <h3 className="modalTitle">Update Profile</h3>
      <img alt="current category" />
      <p>
        Photo Description
      </p>
      <button onClick={onClose} type="button">Save</button>
    </div>
  </div>
  );
}

export default Modal;
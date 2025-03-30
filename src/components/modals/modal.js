import React from 'react';
import ReactDOM from 'react-dom';

function Modal({ children, isOpen }) {
    if (!isOpen) return null;

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={handleModalClick}>
            {children}
        </div>,
        document.getElementById('modal-root')
    );
}

export default Modal;
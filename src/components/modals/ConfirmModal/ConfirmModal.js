import React from 'react';
import './ConfirmModal.css';

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button className="modal-close" onClick={onCancel}>×</button>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
                <div className="modal-footer">
                    <button className="modal-btn cancel-btn" onClick={onCancel}>Annuler</button>
                    <button className="modal-btn confirm-btn" onClick={onConfirm}>Confirmer</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
import React from 'react';
import './ConfirmModal.css';
import Modal from '../modal';

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen}>
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
        </Modal>
    );
}

export default ConfirmModal;
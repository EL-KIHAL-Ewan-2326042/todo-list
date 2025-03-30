import React from 'react';
import '../ConfirmModal/ConfirmModal.css';
import Modal from '../modal';

function CategoryActionModal({ isOpen, category, onClose, onModify, onDelete }) {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen}>
            <div className="modal-container">
                <div className="modal-header">
                    <h3>Modification de la catégorie {category.title}</h3>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <p>Que souhaitez-vous faire avec la catégorie "{category.title}" ?</p>
                </div>
                <div className="modal-footer">
                    <button className="modal-btn cancel-btn" onClick={onClose}>Annuler</button>
                    <button className="modal-btn edit-btn" onClick={onModify}>Modifier</button>
                    <button className="modal-btn confirm-btn" onClick={onDelete}>Supprimer</button>
                </div>
            </div>
        </Modal>
    );
}

export default CategoryActionModal;
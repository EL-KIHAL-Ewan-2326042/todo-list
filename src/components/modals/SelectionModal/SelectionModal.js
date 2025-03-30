import React from 'react';
import './SelectionModal.css';

const SelectionModal = ({ isOpen, onTaskSelect, onCategorySelect, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="selection-modal-overlay" onClick={onClose}>
            <div className="selection-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Que souhaitez-vous faire ?</h3>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <div className="selection-options">
                    <button
                        className="option-button task-option"
                        onClick={onTaskSelect}
                    >
                        <span className="option-icon">✏️</span>
                        Ajouter une tâche
                    </button>
                    <button
                        className="option-button category-option"
                        onClick={onCategorySelect}
                    >
                        <span className="option-icon">🏷️</span>
                        Gérer les catégories
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectionModal;
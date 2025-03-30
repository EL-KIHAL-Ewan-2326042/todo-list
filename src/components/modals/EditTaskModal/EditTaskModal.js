import React from 'react';
import TodoForm from '../../TodoForm';
import Modal from '../modal';
import '../ConfirmModal/ConfirmModal.css';
import './EditTaskModal.css';

function EditTaskModal({ isOpen, todo, categories, onUpdate, onClose }) {
    if (!isOpen) return null;

    const handleSubmit = (updatedTodo) => {
        onUpdate(updatedTodo);
        onClose();
    };

    return (
        <Modal isOpen={isOpen}>
            <div className="modal-container edit-task-modal">
                <div className="modal-header">
                    <h3>Modifier la tâche</h3>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <TodoForm
                        addTodo={handleSubmit}
                        categories={categories}
                        initialValues={todo}
                        submitLabel="Enregistrer"
                        hideSubmitButton={true}
                    />
                </div>
                <div className="modal-footer">
                    <button className="modal-btn cancel-btn" onClick={onClose}>Annuler</button>
                    <button
                        className="modal-btn confirm-btn edit-btn"
                        onClick={() => document.querySelector('.edit-task-modal form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
                    >
                        Modifier
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default EditTaskModal;
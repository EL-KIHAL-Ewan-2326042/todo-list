import React from 'react';
import TodoForm from '../../TodoForm';
import Modal from '../modal';
import '../ConfirmModal/ConfirmModal.css';
import './EditTaskModal.css';

function EditTaskModal({ isOpen, todo, categories, onUpdate, onDelete, onClose }) {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen}>
            <div className="modal-container edit-task-modal">
                <div className="modal-header">
                    <h3>Modifier la tâche</h3>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <TodoForm
                        addTodo={onUpdate}
                        categories={categories}
                        initialValues={todo}
                        submitLabel="Modifier"
                    />
                </div>
                <div className="modal-footer">
                    <button className="modal-btn cancel-btn" onClick={onClose}>Annuler</button>
                    <button className="modal-btn confirm-btn" onClick={() => onDelete(todo.id)}>Supprimer</button>
                </div>
            </div>
        </Modal>
    );
}

export default EditTaskModal;
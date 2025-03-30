import React from 'react';
import TodoForm from '../../TodoForm';
import './TaskModal.css';

const TaskModal = ({ isOpen, onClose, onAddTodo, categories }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay bottom-right">
            <div className="task-modal-container">
                <div className="modal-header">
                    <h3>Ajouter une nouvelle tâche</h3>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <TodoForm addTodo={(todo) => {
                        onAddTodo(todo);
                        onClose();
                    }} categories={categories} />
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
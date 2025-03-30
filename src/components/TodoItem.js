import React, { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import { isTaskExpiredMoreThanWeek, isTaskApproachingDeadline, isTaskRecentlyExpired } from '../utils/dateUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassEmpty } from '@fortawesome/free-solid-svg-icons';
import { getCategoryStyle } from '../utils/colorUtils';

function TodoItem({ todo, toggleTodo, deleteTask, categories }) {
    const [showDetails, setShowDetails] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleToggle = () => {
        toggleTodo(todo.id);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        setShowModal(true);
    };

    const handleEdit = () => {
        console.log('Pas encore implémenté');
    }

    const confirmDelete = () => {
        deleteTask(todo.id);
        setShowModal(false);
    };

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const isDateNearDeadline = () => {
        if (!todo.date_echeance) return false;

        const [day, month, year] = todo.date_echeance.split('/').map(Number);
        const dueDate = new Date(year, month - 1, day);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const oneWeekFromNow = new Date(today);
        oneWeekFromNow.setDate(today.getDate() + 7);

        return dueDate >= today && dueDate <= oneWeekFromNow;
    };

    const getDeadlineStyle = () => {
        if (isTaskApproachingDeadline(todo)) {
            return {
                border: '1px solid #f44336',
                padding: '4px 8px',
                borderRadius: '4px',
                display: 'inline-flex',
                alignItems: 'center'
            };
        }
        if (isTaskRecentlyExpired(todo)) {
            return {
                backgroundColor: '#fff9c4',
                padding: '4px 8px',
                borderRadius: '4px',
                display: 'inline-flex',
                alignItems: 'center'
            };
        }
        return {};
    };


    return (
        <li className={`todo-item ${todo.done ? 'completed' : ''}`}>
            <div className="todo-content">
                <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={handleToggle}
                    id={`todo-${todo.id}`}
                    className="todo-checkbox"
                />
                <label htmlFor={`todo-${todo.id}`} className="todo-text">
                    {todo.title}
                </label>

                {todo.urgent && (
                    <span className="todo-tag urgent-tag">
            ⚠️ Urgent
          </span>
                )}

                {todo.urgent && todo.date_echeance && (
                    <span className="todo-separator">|</span>
                )}

                <div className="todo-date-info">
                    {todo.date_echeance && (
                        <>
                            {isTaskExpiredMoreThanWeek(todo) && (
                                <FontAwesomeIcon
                                    icon={faHourglassEmpty}
                                    className="expired-icon"
                                    style={{ marginLeft: '5px', color: '#f44336' }}
                                />)}
                            <span className="todo-date-label"> Échéance:</span>
                            <span className="todo-date tooltip-container" style={getDeadlineStyle()}>
                                {isTaskApproachingDeadline(todo) && (
                                    <span style={{ marginRight: '5px', color: '#f44336' }}>🚨</span>
                                )}
                                {isTaskRecentlyExpired(todo) && (
                                    <span style={{ marginRight: '5px', color: '#f44336' }}>⏰</span>
                                )}

                                {todo.date_echeance}
                                {todo.date_creation && (
                                    <span className="tooltip-text">Créé le: {todo.date_creation}</span>
                                )}
                            </span>
                        </>
                    )}
                </div>

                <span className="todo-separator">|</span>

                {categories && categories.length > 0 && (
                    <div className="todo-categories">
                        {categories.map(category => (
                            <span
                                key={category.id}
                                className="todo-tag tooltip-container"
                                style={getCategoryStyle(category.color)}
                                title={category.description || "Aucune description"}
                            >
                            {category.title}
                                {category.description && (
                                    <span className="tooltip-text">{category.description}</span>
                                )}
                        </span>
                        ))}
                    </div>
                )}

                {(categories && categories.length > 0) && (
                    <span className="todo-separator">|</span>
                )}

                {todo.date_echeance ? (
                    <button
                        className="todo-action-button todo-details-button"
                        onClick={toggleDetails}
                        aria-label="Détails"
                    >
                        {showDetails ? "▲" : "▼"}
                    </button>
                ) : (
                    <button
                        className="todo-action-button todo-edit-icon"
                        onClick={handleEdit}
                        aria-label="Modifier"
                        title="Modifier la tâche"
                    >
                        ✏️
                    </button>
                )}

                <span className="todo-separator">|</span>

                <button
                    className="todo-delete-btn"
                    onClick={handleDelete}
                    aria-label="Supprimer"
                >
                    ×
                </button>
            </div>

            {showDetails && todo.date_echeance && (
                <div className={`todo-details ${showDetails ? 'show' : ''}`}>

                    {todo.date_creation && (
                        <div className="todo-deadline">
                            <h4>Date de création</h4>
                            <p>{todo.date_creation}</p>
                        </div>
                    )}

                    {todo.description && (
                        <div className="todo-description">
                            <h4>Description</h4>
                            <p>{todo.description}</p>
                        </div>
                    )}


                    {todo.contacts && todo.contacts.length > 0 && (
                        <div className="todo-contacts">
                            <h4>Contacts</h4>
                            <ul>
                                {todo.contacts.map((contact, index) => (
                                    <li key={index}>{contact.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            <ConfirmModal
                isOpen={showModal}
                title="Confirmer la suppression"
                message={`Êtes-vous sûr de vouloir supprimer la tâche "${todo.title}" ?`}
                onConfirm={confirmDelete}
                onCancel={() => setShowModal(false)}
            />
        </li>
    );
}

export default TodoItem;
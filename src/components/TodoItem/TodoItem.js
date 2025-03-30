import React, { useState } from 'react';
import ConfirmModal from '../modals/ConfirmModal/ConfirmModal';
import { isTaskExpiredMoreThanWeek, isTaskApproachingDeadline, isTaskRecentlyExpired } from '../../utils/dateUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassEmpty } from '@fortawesome/free-solid-svg-icons';
import './TodoItem.css';
import CategoryList from '../CategoryList/CategoryList';
import EditTaskModal from '../modals/EditTaskModal/EditTaskModal';

function TodoItem({ todo, toggleTodo, deleteTask, updateTask, categories, onCategoryClick, onContactClick }) {
    const [showDetails, setShowDetails] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleCategoryClick = (category, e) => {
        if (e) {
            e.stopPropagation();
        }
        if (onCategoryClick) {
            onCategoryClick(category);
        }
    };

    const handleContactClick = (contactName, e) => {
        if (e) {
            e.stopPropagation();
        }
        if (onContactClick) {
            onContactClick(contactName);
        }
    };

    const handleToggle = () => {
        toggleTodo(todo.id);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        setShowDeleteModal(true);
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        setShowEditModal(true);
    };

    const confirmDelete = () => {
        deleteTask(todo.id);
        setShowDeleteModal(false);
    };

    const handleUpdateTask = (updatedTodo) => {
        updateTask({
            ...updatedTodo,
            id: todo.id
        });
        setShowEditModal(false);
    };

    const toggleDetails = () => {
        setShowDetails(!showDetails);
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

    const shouldShowDetailsButton = () => {
        return todo.date_echeance || 
        todo.description || 
        (categories && categories.length > 2) ||
        (todo.contacts && todo.contacts.length > 0); 
 };

    const visibleCategories = categories && categories.length > 0 ? categories.slice(0, 2) : [];
    const hasMoreCategories = categories && categories.length > 2;

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
                        {visibleCategories.length > 0 && (
                            <CategoryList
                                categories={visibleCategories}
                                isCheckable={false}
                                className="inline-category-list"
                                onCategoryClick={handleCategoryClick}
                            />
                        )}
                        {hasMoreCategories && (
                            <li className="category-list-item">
                                <span className="more-categories-badge">
                                    +{categories.length - 2}
                                </span>
                            </li>
                        )}
                    </div>
                )}

                {(visibleCategories.length > 0) && (
                    <span className="todo-separator">|</span>
                )}

                {shouldShowDetailsButton() && (
                    <>
                        <button
                            className="todo-action-button todo-details-button"
                            onClick={toggleDetails}
                            aria-label="Détails"
                        >
                            {showDetails ? "▲" : "▼"}
                        </button>
                        <span className="todo-separator">|</span>
                    </>
                )}

                <button
                    className="todo-action-button todo-edit-icon"
                    onClick={handleEdit}
                    aria-label="Modifier"
                    title="Modifier la tâche"
                >
                    ✏️
                </button>

                <span className="todo-separator">|</span>

                <button
                    className="todo-delete-btn"
                    onClick={handleDelete}
                    aria-label="Supprimer"
                >
                    ×
                </button>
            </div>

            {showDetails && shouldShowDetailsButton() && (
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

                    {categories && categories.length > 0 && (
                        <div className="todo-all-categories">
                            <h4>Ensemble des catégories</h4>
                            <CategoryList
                                categories={categories}
                                isCheckable={false}
                                onCategoryClick={handleCategoryClick}
                            />
                        </div>
                    )}

                    {todo.contacts && todo.contacts.length > 0 && (
                        <div className="todo-contacts">
                            <h4>Contacts</h4>
                            <ul>
                                {todo.contacts.map((contact, index) => (
                                     <li
                                         key={index}
                                         onClick={(e) => handleContactClick(contact.name, e)}
                                         className="clickable-contact"
                                         title="Cliquez pour filtrer par ce contact"
                                     >
                                         {contact.name}
                                     </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            <ConfirmModal
                isOpen={showDeleteModal}
                title="Confirmer la suppression"
                message={`Êtes-vous sûr de vouloir supprimer la tâche "${todo.title}" ?`}
                onConfirm={confirmDelete}
                onCancel={() => setShowDeleteModal(false)}
             />

            <EditTaskModal
                isOpen={showEditModal}
                todo={{
                    ...todo,
                    selectedCategories: categories ? categories.map(c => c.id) : []
                }}
                categories={categories}
                onUpdate={handleUpdateTask}
                onDelete={(id) => {
                    setShowEditModal(false);
                    setShowDeleteModal(true);
                }}
                onClose={() => setShowEditModal(false)}
            />

        </li>
    );
}

export default TodoItem;

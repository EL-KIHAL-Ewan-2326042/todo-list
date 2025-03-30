import React from 'react';
import TodoList from '../../TodoList';
import Modal from '../modal';
import './TasksByDateModal.css';

const TasksByDateModal = ({
                              isOpen,
                              onClose,
                              date,
                              tasks,
                              toggleTask,
                              deleteTask,
                              updateTask,
                              getCategories,
                              allCategories,
                              onCategoryClick,
                              onContactClick,
                              onUpdateCategories
                          }) => {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen}>
            <div className="tasks-by-date-modal">
                <div className="modal-header">
                    <h3>Tâches du {date}</h3>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    {tasks.length > 0 ? (
                        <TodoList
                            tasks={tasks}
                            toggleTask={toggleTask}
                            deleteTask={deleteTask}
                            updateTask={updateTask}
                            getCategories={getCategories}
                            allCategories={allCategories}
                            onCategoryClick={onCategoryClick}
                            onContactClick={onContactClick}
                            onUpdateCategories={onUpdateCategories}
                        />
                    ) : (
                        <div className="no-tasks-message">
                            Aucune tâche pour cette date.
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default TasksByDateModal;
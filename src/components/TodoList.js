import React from 'react';
import TodoItem from './TodoItem/TodoItem';

function TodoList({ tasks, toggleTask, deleteTask, updateTask, allCategories, getCategories, onCategoryClick, onContactClick }) {
    if (!tasks || tasks.length === 0) {
        return <div className="empty-list">Aucune tâche à afficher</div>;
    }

    return (
        <ul className="todo-list">
            {tasks.map(task => (
                <TodoItem
                    key={task.id}
                    todo={task}
                    toggleTodo={toggleTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    categories={getCategories ? getCategories(task.id) : []}
                    onCategoryClick={onCategoryClick}
                    onContactClick={onContactClick}
                />
            ))}
        </ul>
    );
}

export default TodoList;

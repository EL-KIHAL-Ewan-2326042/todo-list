import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ tasks, toggleTask, deleteTask, getCategories }) {
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
                    categories={getCategories(task.id)}
                />
            ))}
        </ul>
    );
}

export default TodoList;
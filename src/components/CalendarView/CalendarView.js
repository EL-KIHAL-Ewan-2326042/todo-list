import React, { useState, useEffect } from 'react';
import './CalendarView.css';
import TasksByDateModal from '../modals/TasksByDateModal/TasksByDateModal';

const CalendarView = ({ tasks, toggleTask, deleteTask, updateTask, getCategories, allCategories, onCategoryClick, onContactClick, onUpdateCategories}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [showTasksModal, setShowTasksModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [tasksByDate, setTasksByDate] = useState({});

    useEffect(() => {
        const taskMap = {};
        tasks.forEach(task => {
            if (task.date_echeance) {
                const [day, month, year] = task.date_echeance.split('/').map(Number);
                const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

                if (!taskMap[dateString]) {
                    taskMap[dateString] = [];
                }
                taskMap[dateString].push(task);
            }
        });
        setTasksByDate(taskMap);
    }, [tasks]);

    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

    const handlePreviousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const handleDayClick = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;

        setSelectedDate(date);

        if (tasksByDate[dateString] && tasksByDate[dateString].length > 0) {
            setShowTasksModal(true);
        }
    };

    const generateDays = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const days = [];

        for (let i = 0; i < adjustedFirstDay; ++i) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        // Jours du mois
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const formattedMonth = (month + 1).toString().padStart(2, '0');
            const formattedDay = day.toString().padStart(2, '0');
            const dateString = `${year}-${formattedMonth}-${formattedDay}`;

            const hasTasks = tasksByDate[dateString] && tasksByDate[dateString].length > 0;
            const tasksCount = hasTasks ? tasksByDate[dateString].length : 0;

            days.push(
                <div
                    key={`day-${day}`}
                    className={`calendar-day ${hasTasks ? 'has-tasks' : ''}`}
                    onClick={() => handleDayClick(date)}
                >
                    <span className="day-number">{day}</span>
                    {hasTasks && (
                        <div className="task-indicator">
                            <span className="task-count">{tasksCount}</span>
                        </div>
                    )}
                </div>
            );
        }

        return days;
    };

    const getSelectedDateTasks = () => {
        if (!selectedDate) return [];

        const year = selectedDate.getFullYear();
        const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
        const day = selectedDate.getDate().toString().padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;

        return tasksByDate[dateString] || [];
    };

    const formatSelectedDate = () => {
        if (!selectedDate) return '';

        const day = selectedDate.getDate();
        const month = monthNames[selectedDate.getMonth()];
        const year = selectedDate.getFullYear();

        return `${day} ${month} ${year}`;
    };

    return (
        <div className="calendar-view-container">
            <div className="calendar-header">
                <button onClick={handlePreviousMonth} className="month-nav">
                    &lt;
                </button>
                <div className="current-month">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </div>
                <button onClick={handleNextMonth} className="month-nav">
                    &gt;
                </button>
            </div>

            <div className="calendar-days-header">
                {dayNames.map((day, index) => (
                    <div key={`header-${index}`} className="day-name">{day}</div>
                ))}
            </div>

            <div className="calendar-days-grid">
                {generateDays()}
            </div>

            <TasksByDateModal
                isOpen={showTasksModal}
                onClose={() => setShowTasksModal(false)}
                date={formatSelectedDate()}
                tasks={getSelectedDateTasks()}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                getCategories={getCategories}
                allCategories={allCategories}
                onCategoryClick={onCategoryClick}
                onContactClick={onContactClick}
                onUpdateCategories={onUpdateCategories}
            />
        </div>
    );
};

export default CalendarView;
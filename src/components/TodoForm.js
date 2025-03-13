import React, { useState } from 'react';
import DatePicker from './DatePicker';
import { getCategoryStyle } from '../utils/colorUtils';

function TodoForm({ addTodo, categories }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date_creation: formatDateToDisplay(new Date()),
        date_echeance: '',
        done: false,
        urgent: false,
        contacts: [],
        selectedCategories: []
    });

    const [showDetails, setShowDetails] = useState(false);


    function formatDateToDisplay(dateString) {
        if (!dateString) return '';

        let date;
        if (dateString instanceof Date) {
            date = dateString;
        } else {
            const [year, month, day] = dateString.split('-');
            if (!year || !month || !day) return '';
            date = new Date(year, month - 1, day);
        }

        if (isNaN(date.getTime())) return '';

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleDateChange = (name, date) => {
        setFormData({
            ...formData,
            [name]: date ? formatDateToDisplay(date) : ''
        });
    };

    const handleCategoryToggle = (categoryId) => {
        const isSelected = formData.selectedCategories.includes(categoryId);

        setFormData({
            ...formData,
            selectedCategories: isSelected
                ? formData.selectedCategories.filter(id => id !== categoryId)
                : [...formData.selectedCategories, categoryId]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        addTodo(formData);

        setFormData({
            title: '',
            description: '',
            date_creation: formatDateToDisplay(new Date()),
            date_echeance: '',
            done: false,
            urgent: false,
            contacts: [],
            selectedCategories: []
        });

        setShowDetails(false);
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <div className="todo-form-main">
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Ajouter une tâche..."
                    className="todo-input"
                    required
                />
                <button
                    type="button"
                    className="todo-details-toggle"
                    onClick={() => setShowDetails(!showDetails)}
                >
                    {showDetails ? '▲' : '▼'}
                </button>
                <button type="submit" className="todo-button">Ajouter</button>
            </div>

            <div className={`todo-form-details ${showDetails ? 'show' : ''}`}>

                <div className="date-urgent-container">
                    <div className="form-group">
                        <label>Date d'échéance:</label>
                        <DatePicker
                            selectedDate={formData.date_echeance ? formData.date_echeance.split('/').reverse().join('-') : ''}
                            onChange={(date) => handleDateChange('date_echeance', date)}
                            placeholder="Sélectionner une date"
                            disablePastDates={true}
                        />
                    </div>

                    <div className="form-group urgent-checkbox-container">
                        <div className="toggle-container">
                            <input
                                type="checkbox"
                                id="urgent"
                                name="urgent"
                                checked={formData.urgent}
                                onChange={handleChange}
                            />
                            <label htmlFor="urgent">Urgent</label>
                        </div>
                    </div>
                </div>

                {categories && categories.length > 0 && (
                    <div className="form-group">
                        <label>Catégories:</label>
                        <div className="category-selector">
                            {categories.map(category => (
                                <div
                                    key={category.id}
                                    className={`category-chip ${formData.selectedCategories.includes(category.id) ? 'selected' : ''}`}
                                    style={getCategoryStyle(category.color)}
                                    onClick={() => handleCategoryToggle(category.id)}
                                >
                                    {category.title}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="todo-textarea"
                        rows="3"
                    />
                </div>
            </div>
        </form>
    );
}

export default TodoForm;
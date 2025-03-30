import React, { useState, useEffect } from 'react';
import './CategoryForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome, faBriefcase, faGraduationCap, faHeartPulse, faUtensils,
    faShoppingCart, faPlane, faDumbbell, faCalendarCheck, faCoins
} from '@fortawesome/free-solid-svg-icons';
import { getCategoryBackgroundColor } from '../../utils/colorUtils';

function AddCategory({ addCategory, isEditing = false, categoryToEdit = null, onCancel = null }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        color: 'orange',
        icon: 'home'
    });

    useEffect(() => {
        if (isEditing && categoryToEdit) {
            setFormData({
                title: categoryToEdit.title || '',
                description: categoryToEdit.description || '',
                color: categoryToEdit.color || 'orange',
                icon: categoryToEdit.icon || 'home',
                id: categoryToEdit.id
            });
        }
    }, [isEditing, categoryToEdit]);

    const colorOptions = [
        { value: 'orange', label: 'Orange' },
        { value: 'pink', label: 'Rose' },
        { value: 'bluesky', label: 'Bleu ciel' },
        { value: 'green', label: 'Vert' },
        { value: 'purple', label: 'Violet' },
        { value: 'red', label: 'Rouge' },
        { value: 'yellow', label: 'Jaune' },
        { value: 'blue', label: 'Bleu' },
        { value: 'gray', label: 'Gris' },
        { value: 'black', label: 'Noir' }
    ];

    const iconOptions = [
        { value: 'home', label: 'Maison', icon: faHome },
        { value: 'work', label: 'Travail', icon: faBriefcase },
        { value: 'education', label: 'Éducation', icon: faGraduationCap },
        { value: 'health', label: 'Santé', icon: faHeartPulse },
        { value: 'food', label: 'Alimentation', icon: faUtensils },
        { value: 'shopping', label: 'Shopping', icon: faShoppingCart },
        { value: 'travel', label: 'Voyage', icon: faPlane },
        { value: 'fitness', label: 'Fitness', icon: faDumbbell },
        { value: 'event', label: 'Événement', icon: faCalendarCheck },
        { value: 'finance', label: 'Finance', icon: faCoins }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim() || formData.title.trim().length < 3) return;

        addCategory({
            ...formData,
            description: formData.description || ''
        });

        if (!isEditing) {
            // Reset form only when adding, not editing
            setFormData({
                title: '',
                description: '',
                color: 'orange',
                icon: 'home'
            });
        } else if (onCancel) {
            // Close modal when editing
            onCancel();
        }
    };

    return (
        <div className="add-category-container">
            <form onSubmit={handleSubmit} className="category-form">
                <div className="form-group">
                    <label htmlFor="title">Nom de la catégorie:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Ex: Travail, Personnel..."
                        className="category-input"
                        required
                        minLength={3}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="color">Couleur:</label>
                    <div className="color-selector">
                        {colorOptions.map(option => (
                            <label key={option.value} className="color-option">
                                <input
                                    type="radio"
                                    name="color"
                                    value={option.value}
                                    checked={formData.color === option.value}
                                    onChange={handleChange}
                                />
                                <span
                                    className="color-preview tooltip-container"
                                    style={{
                                        backgroundColor: getCategoryBackgroundColor(option.value)
                                    }}
                                >
                                    <span className="tooltip-text">{option.label}</span>
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description (optionnelle):</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description de la catégorie..."
                        className="category-textarea"
                        rows="2"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="icon">Pictogramme (optionnel):</label>
                    <div className="icon-selector">
                        {iconOptions.map(option => (
                            <label key={option.value} className="icon-option">
                                <input
                                    type="radio"
                                    name="icon"
                                    value={option.value}
                                    checked={formData.icon === option.value}
                                    onChange={handleChange}
                                />
                                <span className="icon-preview tooltip-container">
                                    <FontAwesomeIcon icon={option.icon} />
                                    <span className="tooltip-text">{option.label}</span>
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-buttons">
                    {isEditing && (
                        <button type="button" className="category-button cancel" onClick={onCancel}>
                            Annuler
                        </button>
                    )}
                    <button type="submit" className="category-button">
                        {isEditing ? 'Modifier la catégorie' : 'Ajouter la catégorie'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddCategory;
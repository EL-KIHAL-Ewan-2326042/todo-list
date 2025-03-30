import React, { useState } from 'react';
import './CategoryForm.css';
import { getCategoryStyle, getCategoryBackgroundColor } from '../../utils/colorUtils';

function CategoryForm({ addCategory, categories }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        color: 'orange'
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        addCategory({
            title: formData.title,
            description: formData.description || '',
            color: formData.color,
            icon: ''
        });

        setFormData({
            title: '',
            description: '',
            color: 'orange'
        });
    };

    return (
        <div className="category-management">
            <form onSubmit={handleSubmit} className="category-form">
                <h3>Ajouter une catégorie</h3>
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
                    />
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

                <button type="submit" className="category-button">Ajouter la catégorie</button>
            </form>

            <div className="category-list">
                <h3>Catégories existantes</h3>
                {categories.length === 0 ? (
                    <p>Aucune catégorie définie</p>
                ) : (
                    <ul className="categories">
                        {categories.map(category => (
                            <li key={category.id} className="category-item">
                                  <span
                                      className="category-badge tooltip-container"
                                      style={getCategoryStyle(category.color)}
                                      title={category.description || "Aucune description"}
                                  >
                                    {category.title}
                                      {category.description && <span className="tooltip-text">{category.description}</span>}
                                  </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default CategoryForm;
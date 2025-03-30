import React from 'react';
import CategoryItem from '../CategoryItem/CategoryItem';
import './CategoryList.css';

function CategoryList({
                          categories,
                          isCheckable = false,
                          selectedCategories = [],
                          onCategoryToggle = null,
                          emptyMessage = "Aucune catégorie à afficher",
                          className = ""
                      }) {
    if (!categories || categories.length === 0) {
        return <div className="empty-categories">{emptyMessage}</div>;
    }

    return (
        <ul className={`categories-list-container ${className}`}>
            {categories.map(category => (
                <li key={category.id} className="category-list-item">
                    <CategoryItem
                        category={category}
                        isCheckable={isCheckable}
                        isChecked={selectedCategories.includes(category.id)}
                        onChange={onCategoryToggle}
                    />
                </li>
            ))}
        </ul>
    );
}

export default CategoryList;
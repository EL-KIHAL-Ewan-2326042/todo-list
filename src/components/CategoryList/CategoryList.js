import React from 'react';
import './CategoryList.css';
import CategoryItem from '../CategoryItem/CategoryItem';

function CategoryList({ categories, selectedCategoryIds, toggleCategory, isCheckable = true, emptyMessage = "Aucune catégorie", onCategoryClick }) {
    if (!categories || categories.length === 0) {
        return <div className="empty-categories">{emptyMessage}</div>;
    }

    return (
        <ul className="categories-list-container">
            {categories.map(category => (
                <li key={category.id} className="category-list-item">
                    {isCheckable ? (
                        <CategoryItem
                            category={category}
                            isSelected={selectedCategoryIds?.includes(category.id)}
                            onToggle={() => toggleCategory(category.id)}
                            isCheckable={true}
                        />
                    ) : (
                        <div
                            onClick={(e) => onCategoryClick && onCategoryClick(category, e)}
                            className="clickable-category"
                        >
                            <CategoryItem
                                category={category}
                                isCheckable={false}
                            />
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default CategoryList;
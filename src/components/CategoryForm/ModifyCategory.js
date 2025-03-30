import React from 'react';
import './CategoryForm.css';
import CategoryList from '../CategoryList/CategoryList';

function ModifyCategory({ categories }) {
    return (
        <div className="modify-category-container">
            <CategoryList
                categories={categories}
                isCheckable={false}
                emptyMessage="Aucune catégorie définie"
            />
        </div>
    );
}

export default ModifyCategory;
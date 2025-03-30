import React, { useState } from 'react';
import './CategoryForm.css';
import AddCategory from './AddCategory';
import ModifyCategory from './ModifyCategory';

function CategoryForm({ addCategory, categories, updateCategory, deleteCategory }) {
    const [activeTab, setActiveTab] = useState('add');

    const handleAddCategory = (category) => {
        addCategory(category);
        setActiveTab('modify');
    };

    return (
        <div className="category-management">
            <div className="category-tabs">
                <button
                    className={`tab-button ${activeTab === 'add' ? 'active' : ''}`}
                    onClick={() => setActiveTab('add')}
                >
                    Ajouter une catégorie
                </button>
                <button
                    className={`tab-button ${activeTab === 'modify' ? 'active' : ''}`}
                    onClick={() => setActiveTab('modify')}
                >
                    Modifier une catégorie
                </button>
            </div>

            <div className="tab-content-container">
                {activeTab === 'add' && (
                    <div className="tab-content active">
                        <AddCategory addCategory={handleAddCategory} />
                    </div>
                )}

                {activeTab === 'modify' && (
                    <div className="tab-content active">
                        <ModifyCategory
                            categories={categories}
                            updateCategory={updateCategory}
                            deleteCategory={deleteCategory}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default CategoryForm;
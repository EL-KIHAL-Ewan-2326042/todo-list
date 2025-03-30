import React, { useState } from 'react';
import './CategoryForm.css';
import CategoryList from '../CategoryList/CategoryList';
import CategoryActionModal from '../modals/CategoryActionModal/CategoryActionModal';
import EditCategoryModal from '../modals/EditCategoryModal/EditCategoryModal';
import ConfirmModal from '../modals/ConfirmModal/ConfirmModal';
import todoStorage from '../../services/todoStorage';

function ModifyCategory({ categories, updateCategory: propUpdateCategory, deleteCategory: propDeleteCategory }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showActionModal, setShowActionModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [message, setMessage] = useState(null);

    const updateCategory = (updatedCategory) => {
        if (typeof propUpdateCategory === 'function') {
            propUpdateCategory(updatedCategory);
        } else {
            const data = todoStorage.loadData() || { categories: [] };
            const updatedCategories = data.categories.map(cat =>
                cat.id === updatedCategory.id ? updatedCategory : cat
            );

            todoStorage.saveData({
                ...data,
                categories: updatedCategories
            });

            setMessage({ type: 'success', text: 'Catégorie mise à jour avec succès' });
            setTimeout(() => setMessage(null), 3000);
            window.location.reload();
        }
    };

    const deleteCategory = (categoryId) => {
        if (typeof propDeleteCategory === 'function') {
            propDeleteCategory(categoryId);
        } else {
            const data = todoStorage.loadData() || { categories: [] };
            const updatedCategories = data.categories.filter(cat => cat.id !== categoryId);

            todoStorage.saveData({
                ...data,
                categories: updatedCategories
            });

            setMessage({ type: 'success', text: 'Catégorie supprimée avec succès' });
            setTimeout(() => setMessage(null), 3000);
            window.location.reload();
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setShowActionModal(true);
    };

    const handleModify = () => {
        setShowActionModal(false);
        setShowEditModal(true);
    };

    const handleDelete = () => {
        setShowActionModal(false);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        deleteCategory(selectedCategory.id);
        setShowDeleteModal(false);
        setSelectedCategory(null);
    };

    const handleUpdate = (updatedCategory) => {
        updateCategory({
            ...updatedCategory,
            id: selectedCategory.id
        });
        setShowEditModal(false);
        setSelectedCategory(null);
    };

    const closeModals = () => {
        setShowActionModal(false);
        setShowEditModal(false);
        setShowDeleteModal(false);
        setSelectedCategory(null);
    };

    return (
        <div className="modify-category-container">
            {message && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <CategoryList
                categories={categories}
                isCheckable={false}
                emptyMessage="Aucune catégorie définie"
                onCategoryClick={handleCategoryClick}
            />

            <CategoryActionModal
                isOpen={showActionModal}
                category={selectedCategory || {}}
                onClose={closeModals}
                onModify={handleModify}
                onDelete={handleDelete}
            />

            <EditCategoryModal
                isOpen={showEditModal}
                category={selectedCategory}
                onClose={closeModals}
                onUpdate={handleUpdate}
            />

            <ConfirmModal
                isOpen={showDeleteModal}
                title="Supprimer la catégorie"
                message={`Êtes-vous sûr de vouloir supprimer la catégorie "${selectedCategory?.title}" ? Cette action est irréversible.`}
                onConfirm={confirmDelete}
                onCancel={closeModals}
            />
        </div>
    );
}

export default ModifyCategory;
import React, { useState } from 'react';
import Modal from '../modal';
import CategoryList from '../../CategoryList/CategoryList';
import './CategoryManagerModal.css';

function CategoryManagerModal({ isOpen, onClose, taskId, taskTitle, allCategories, selectedCategories, onUpdateCategories }) {
    const [selectedCategoryIds, setSelectedCategoryIds] = useState(
        selectedCategories ? selectedCategories.map(cat => cat.id) : []
    );

    const handleToggleCategory = (categoryId) => {
        if (selectedCategoryIds.includes(categoryId)) {
            setSelectedCategoryIds(selectedCategoryIds.filter(id => id !== categoryId));
        } else {
            setSelectedCategoryIds([...selectedCategoryIds, categoryId]);
        }
    };

    const handleSave = () => {
        onUpdateCategories(taskId, selectedCategoryIds);
        onClose();
    };

    return (
        <Modal isOpen={isOpen}>
            <div className="modal-container category-manager-modal">
                <div className="modal-header">
                    <h3>Gérer les catégories</h3>
                    <div className="task-title-display">Tâche : {taskTitle}</div>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <p className="instruction">Sélectionnez les catégories pour cette tâche :</p>

                    {allCategories && allCategories.length > 0 ? (
                        <CategoryList
                            categories={allCategories}
                            isCheckable={true}
                            selectedCategoryIds={selectedCategoryIds}
                            toggleCategory={handleToggleCategory}
                        />
                    ) : (
                        <div className="no-categories-message">
                            Aucune catégorie disponible. Créez des catégories pour pouvoir les assigner à vos tâches.
                        </div>
                    )}
                </div>
                <div className="modal-footer">
                    <button className="modal-btn cancel-btn" onClick={onClose}>Annuler</button>
                    <button className="modal-btn confirm-btn" onClick={handleSave}>Enregistrer</button>
                </div>
            </div>
        </Modal>
    );
}

export default CategoryManagerModal;
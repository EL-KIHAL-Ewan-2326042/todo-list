import React from 'react';
import '../ConfirmModal/ConfirmModal.css';
import AddCategory from '../../CategoryForm/AddCategory';
import Modal from '../modal';

function EditCategoryModal({ isOpen, category, onClose, onUpdate }) {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen}>
            <div className="modal-container edit-category-modal">
                <div className="modal-header">
                    <h3>Modifier la catégorie {category.title}</h3>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <AddCategory
                        isEditing={true}
                        categoryToEdit={category}
                        addCategory={onUpdate}
                        onCancel={onClose}
                    />
                </div>
            </div>
        </Modal>
    );
}

export default EditCategoryModal;
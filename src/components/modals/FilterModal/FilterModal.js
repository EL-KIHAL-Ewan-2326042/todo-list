import React from 'react';
import './FilterModal.css';
import TodoFilter from '../../TodoFilter';

const FilterModal = ({
                         isOpen,
                         onClose,
                         filter,
                         setFilter,
                         searchQuery,
                         setSearchQuery,
                         activeFilter,
                         setActiveFilter,
                         position="top-right"
                     }) => {
    if (!isOpen) return null;

    return (
        <div className={`filter-modal-overlay ${position}`} onClick={onClose}>
            <div className="filter-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Filtrer les tâches</h3>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <div className="filter-modal-content">
                    <TodoFilter
                        filter={filter}
                        setFilter={setFilter}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
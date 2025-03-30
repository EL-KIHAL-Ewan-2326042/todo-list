import React from 'react';
import './ActiveFilters.css';

function ActiveFilters({ filter, searchQuery, activeFilter, categories, onClearFilters }) {
    const hasActiveFilters = () => {
        return searchQuery ||
            filter.createDateTarget ||
            filter.dueDateTarget ||
            filter.status !== 'all' ||
            activeFilter !== 'dueDate' ||
            filter.selectedCategory;
    };

    if (!hasActiveFilters()) {
        return null;
    }

    const getFilterText = () => {
        const filterTexts = [];

        if (searchQuery) {
            filterTexts.push(`Recherche : "${searchQuery}"`);
        }

        if (filter.status !== 'all') {
            filterTexts.push(`Statut : ${filter.status === 'active' ? 'En cours' : 'Terminées'}`);
        }

        if (activeFilter === 'name') {
            filterTexts.push('Tri par nom');
        } else if (activeFilter === 'date') {
            filterTexts.push('Tri par date de création');
        } else if (activeFilter === 'dueDate' && filter.dueDateTarget) {
            const direction = filter.dueDateDirection === '<' ? "Jusqu'au" : "À partir du";
            filterTexts.push(`Échéance : ${direction} ${filter.dueDateTarget}`);
        }

        if (filter.selectedCategory) {
            const categoryName = categories.find(c => c.id === filter.selectedCategory)?.title || '';
            filterTexts.push(`Catégorie : ${categoryName}`);
        }

        return filterTexts.join(' | ');
    };

    return (
        <div className="active-filters">
            <span className="filter-text">{getFilterText()}</span>
            <button className="clear-filters-btn" onClick={onClearFilters}>
                Effacer les filtres
            </button>
        </div>
    );
}

export default ActiveFilters;
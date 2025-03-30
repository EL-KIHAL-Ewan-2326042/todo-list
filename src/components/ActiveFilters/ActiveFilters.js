import React from 'react';
import './ActiveFilters.css';

function ActiveFilters({ filter, searchQuery, activeFilter, categories, onClearFilters }) {
    const hasActiveFilters = () => {
        return searchQuery ||
            filter.status !== 'all' ||
            activeFilter !== 'dueDate' ||
            (filter.selectedCategories && filter.selectedCategories.length > 0) ||
            (filter.selectedContacts && filter.selectedContacts.length > 0) ||
            filter.createDateTarget ||
            filter.dueDateTarget;
    };

    if (!hasActiveFilters()) {
        return null;
    }

    const getCategoryNames = () => {
        if (!filter.selectedCategories || !filter.selectedCategories.length || !categories) return [];
        return filter.selectedCategories.map(id => {
            const category = categories.find(c => c.id === id);
            return category ? category.title : '';
        }).filter(Boolean);
    };

    const getFilterText = () => {
        const parts = [];

        if (filter.status !== 'all') {
            parts.push(`Statut: ${filter.status === 'active' ? 'En cours' : 'Terminées'}`);
        }

        if (searchQuery) {
            parts.push(`Recherche: "${searchQuery}"`);
        }

        const sortMethods = {
            'name': 'Nom',
            'date': 'Date de création',
            'dueDate': 'Date d\'échéance',
            'category': 'Catégorie',
            'contact': 'Contact'
        };
        if (activeFilter && activeFilter !== 'dueDate') {
            parts.push(`Trié par: ${sortMethods[activeFilter] || activeFilter}`);
        }

        if (filter.createDateTarget) {
            const direction = filter.createDateDirection === '>' ? 'après' : 'avant';
            parts.push(`Créé ${direction} le: ${filter.createDateTarget}`);
        }

        if (filter.dueDateTarget) {
            const direction = filter.dueDateDirection === '>' ? 'après' : 'avant';
            parts.push(`Échéance ${direction} le: ${filter.dueDateTarget}`);
        }

        const categoryNames = getCategoryNames();
        if (categoryNames.length > 0) {
            parts.push(`Catégories: ${categoryNames.join(', ')}`);
        }

        if (filter.selectedContacts && filter.selectedContacts.length > 0) {
            parts.push(`Contacts: ${filter.selectedContacts.join(', ')}`);
        }

        return parts.join(' • ');
    };

    return (
        <div className="active-filters">
            <div className="filter-text">
                {getFilterText()}
            </div>
            <button className="clear-filters-btn" onClick={onClearFilters}>
                Effacer
            </button>
        </div>
    );
}

export default ActiveFilters;

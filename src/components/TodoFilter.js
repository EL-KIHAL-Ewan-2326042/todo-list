import React, { useState } from 'react';
import DatePicker from './DatePicker';
import {DEFAULT_SORT} from '../App.js';

function TodoFilter({ filter, setFilter, searchQuery, setSearchQuery, activeFilter, setActiveFilter }) {
    const [createDateTarget, setCreateDateTarget] = useState(false);
    const [dueDateTarget, setDueDateTarget] = useState(false);
    const [createDateDirection, setCreateDateDirection] = useState('>');
    const [dueDateDirection, setDueDateDirection] = useState('<');

    const handleFilterSelect = (filterType) => {
        setActiveFilter(filterType);
        setFilter({
            ...filter,
            sort: filterType
        });
    };

    const handleDateChange = (field, date) => {
        setFilter({
            ...filter,
            [field]: date
        });
    };

    const toggleCreateDateTarget = () => {
        setCreateDateTarget(!createDateTarget);
        if (!createDateTarget) {
            setFilter({
                ...filter,
                createDateTarget: filter.createDateTarget || null,
                createDateDirection: createDateDirection
            });
        } else {
            const { createDateTarget, ...rest } = filter;
            setFilter(rest);
        }
    };

    const toggleDueDateTarget = () => {
        setDueDateTarget(!dueDateTarget);
        if (!dueDateTarget) {
            setFilter({
                ...filter,
                dueDateTarget: filter.dueDateTarget || null,
                dueDateDirection: dueDateDirection
            });
        } else {
            const { dueDateTarget, ...rest } = filter;
            setFilter(rest);
        }
    };

    const toggleCreateDateDirection = () => {
        const newDirection = createDateDirection === '>' ? '<' : '>';
        setCreateDateDirection(newDirection);
        setFilter({
            ...filter,
            createDateDirection: newDirection
        });

        if (activeFilter === 'date') {
            setFilter({
                ...filter,
                createDateDirection: newDirection,
                sort: 'date'
            });
        }
    };

    const toggleDueDateDirection = () => {
        const newDirection = dueDateDirection === '>' ? '<' : '>';
        setDueDateDirection(newDirection);
        setFilter({
            ...filter,
            dueDateDirection: newDirection
        });

        if (activeFilter === 'dueDate') {
            setFilter({
                ...filter,
                dueDateDirection: newDirection,
                sort: 'dueDate'
            });
        }
    };

    const clearFilters = () => {
        setFilter({
            status: 'all',
            sort: DEFAULT_SORT
        });
        setSearchQuery('');
        setActiveFilter(DEFAULT_SORT);
        setCreateDateTarget(false);
        setDueDateTarget(false);
        setCreateDateDirection('>');
        setDueDateDirection('<');
    };

    const hasActiveFilters = () => {
        return searchQuery ||
            filter.createDateTarget ||
            filter.dueDateTarget ||
            filter.status !== 'all' ||
            activeFilter !== DEFAULT_SORT;
    };

    return (
        <div className="filter-options">
            <div className="filter-options-list">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <i className="fa-solid fa-search search-icon"></i>
                </div>

                <button
                    className={`filter-option ${activeFilter === 'name' ? 'active' : ''}`}
                    onClick={() => handleFilterSelect('name')}
                >
                    <i className="fa-solid fa-sort-alpha-down option-icon"></i>
                    Ordre alphabétique
                </button>

                <div className="filter-date-container">
                    <button
                        className={`filter-option ${activeFilter === 'date' ? 'active' : ''}`}
                        onClick={() => handleFilterSelect('date')}
                    >
                        <i className="fa-solid fa-calendar-plus option-icon"></i>
                        Date de création
                        <div className="date-target-controls">
                            <span
                                className="target-direction"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleCreateDateDirection();
                                }}
s                                title="Changer la direction"
                            >
                                {createDateDirection}
                            </span>
                            <button
                                className={`date-target-toggle ${createDateTarget ? 'targeted' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleCreateDateTarget();
                                }}
                                title={createDateTarget ? "Désactiver le filtre de date" : "Activer le filtre de date"}
                            >
                                <i className={`fa-solid ${createDateTarget ? 'fa-bullseye' : 'fa-crosshairs'}`}></i>
                            </button>
                        </div>
                    </button>
                </div>

                {createDateTarget && (
                    <div className="date-range-container">
                        <div className="date-range-field">
                            <label>
                                {createDateDirection === '>' ? 'À partir du' : 'Jusqu\'au'}
                            </label>
                            <DatePicker
                                selectedDate={filter.createDateTarget}
                                onChange={(date) => handleDateChange('createDateTarget', date)}
                                placeholder="Sélectionner une date"
                            />
                        </div>
                    </div>
                )}

                <div className="filter-date-container">
                    <button
                        className={`filter-option ${activeFilter === 'dueDate' ? 'active' : ''}`}
                        onClick={() => handleFilterSelect('dueDate')}
                    >
                        <i className="fa-solid fa-calendar-day option-icon"></i>
                        Date d'échéance
                        <div className="date-target-controls">
                            <span
                                className="target-direction"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleDueDateDirection();}}
                                title="Changer la direction"
                            >
                                {dueDateDirection}
                            </span>
                            <button
                                className={`date-target-toggle ${dueDateTarget ? 'targeted' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleDueDateTarget();}}
                                title={dueDateTarget ? "Désactiver le filtre de date" : "Activer le filtre de date"}
                            >
                                <i className={`fa-solid ${dueDateTarget ? 'fa-bullseye' : 'fa-crosshairs'}`}></i>
                            </button>
                        </div>
                    </button>
                </div>

                {dueDateTarget && (
                    <div className="date-range-container">
                        <div className="date-range-field">
                            <label>
                                {dueDateDirection === '>' ? 'À partir du' : 'Jusqu\'au'}
                            </label>
                            <DatePicker
                                selectedDate={filter.dueDateTarget}
                                onChange={(date) => handleDateChange('dueDateTarget', date)}
                                placeholder="Sélectionner une date"
                            />
                        </div>
                    </div>
                )}

                <button
                    className={`filter-option ${activeFilter === 'category' ? 'active' : ''}`}
                    onClick={() => handleFilterSelect('category')}
                >
                    <i className="fa-solid fa-tags option-icon"></i>
                    Catégorie
                </button>

                <button
                    className={`filter-option clear-filters ${!hasActiveFilters() ? 'disabled' : ''}`}
                    onClick={clearFilters}
                    disabled={!hasActiveFilters()}
                >
                    <i className="fa-solid fa-times-circle option-icon"></i>
                    Effacer les filtres
                </button>

            </div>
        </div>
    );
}

export default TodoFilter;
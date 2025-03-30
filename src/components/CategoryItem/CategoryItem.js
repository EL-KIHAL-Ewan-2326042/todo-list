import React from 'react';
import { getCategoryStyle } from '../../utils/colorUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome, faBriefcase, faGraduationCap, faHeartPulse, faUtensils,
    faShoppingCart, faPlane, faDumbbell, faCalendarCheck, faCoins
} from '@fortawesome/free-solid-svg-icons';
import './CategoryItem.css';

function CategoryItem({
                          category,
                          isCheckable = false,
                          isChecked = false,
                          onChange = null,
                          className = ""
                      }) {
    const iconMap = {
        'home': faHome,
        'work': faBriefcase,
        'education': faGraduationCap,
        'health': faHeartPulse,
        'food': faUtensils,
        'shopping': faShoppingCart,
        'travel': faPlane,
        'fitness': faDumbbell,
        'event': faCalendarCheck,
        'finance': faCoins
    };

    const getIconComponent = (iconName) => {
        return iconName && iconMap[iconName] ? (
            <FontAwesomeIcon icon={iconMap[iconName]} className="category-icon" />
        ) : null;
    };

    if (isCheckable) {
        return (
            <label className={`category-item-checkable ${className}`}>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onChange && onChange(category.id)}
                />
                <span
                    className="category-badge tooltip-container"
                    style={getCategoryStyle(category.color)}
                >
                    {category.icon && getIconComponent(category.icon)}
                    {category.title}
                    {category.description && <span className="tooltip-text">{category.description}</span>}
                </span>
            </label>
        );
    }

    return (
        <span
            className={`category-badge tooltip-container ${className}`}
            style={getCategoryStyle(category.color)}
            title={category.description || "Aucune description"}
        >
            {category.icon && getIconComponent(category.icon)}
            {category.title}
            {category.description && <span className="tooltip-text">{category.description}</span>}
        </span>
    );
}

export default CategoryItem;
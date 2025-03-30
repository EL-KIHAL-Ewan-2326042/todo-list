import React from 'react';
import './HelpMenu.css';

const HelpMenu = ({
                      isOpen,
                      onClose,
                      onExport,
                      onImport,
                      onClearTasks,
                      onResetTasks,
                      onShowAllTasks,
                      showAllTasks
                  }) => {
    if (!isOpen) return null;

    return (
        <div className="help-menu-overlay" onClick={onClose}>
            <div className="help-menu" onClick={e => e.stopPropagation()}>
                <div className="help-menu-header">
                    <i>?</i>
                    Options supplémentaires
                    <button className="menu-close" onClick={onClose}>×</button>
                </div>

                <div className="help-menu-options">
                    <button onClick={onExport} className="menu-item export-btn">
                        <i className="fa-solid fa-arrow-up option-icon"></i>
                        Exporter (JSON)
                    </button>

                    <label className="menu-item import-btn">
                        <i className="fa-solid fa-arrow-down option-icon"></i>
                        Importer (JSON)
                        <input
                            type="file"
                            accept=".json"
                            onChange={onImport}
                            style={{ display: 'none' }}
                        />
                    </label>

                    <button onClick={onClearTasks} className="menu-item clear-btn">
                        <i className="fa-solid fa-trash option-icon"></i>
                        Vider les tâches
                    </button>

                    <button onClick={onResetTasks} className="menu-item reset-btn">
                        <i className="fa-solid fa-refresh option-icon"></i>
                        Réinitialiser tâches
                    </button>

                    <button onClick={onShowAllTasks} className="menu-item show-all-btn">
                        <i className={`fa-solid ${showAllTasks ? 'fa-eye-slash' : 'fa-eye'} option-icon`}></i>
                        {showAllTasks ? "Masquer les tâches anciennes" : "Afficher toutes les tâches"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HelpMenu;
import React from 'react';
import './WelcomeModal.css';

function WelcomeModal({ onImport, onStartFresh }) {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onImport(file);
        }
    };

    return (
        <div className="welcome-modal-overlay">
            <div className="welcome-modal">
                <div className="welcome-modal-header">
                    <h2>Bienvenue sur votre Todo List</h2>
                </div>
                <div className="welcome-modal-body">
                    <p>Pour commencer, veuillez choisir une option :</p>

                    <div className="welcome-options">
                        <div className="welcome-option">
                            <div>
                                <h3>Importer un fichier JSON</h3>
                                <p>Continuez avec vos tâches existantes en important un fichier JSON</p>
                            </div>
                            <div className="button-container">
                                <label htmlFor="import-file" className="import-button">
                                    Importer un fichier
                                </label>
                                <input
                                    type="file"
                                    id="import-file"
                                    accept=".json"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>

                        <div className="welcome-option">
                            <div>
                                <h3>Commencer de zéro</h3>
                                <p>Créez une nouvelle liste de tâches</p>
                            </div>
                            <div className="button-container">
                                <button className="start-fresh-button" onClick={onStartFresh}>
                                    Commencer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WelcomeModal;
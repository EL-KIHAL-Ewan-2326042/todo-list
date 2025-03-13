import React, { useState } from 'react';
import './ConfirmModal.css';
import { FILE_NAME } from '../services/todoStorage';

function ExportModal({ isOpen, onConfirm, onCancel }) {
    const [filename, setFilename] = useState(FILE_NAME);

    if (!isOpen) return null;

    const handleConfirm = () => {
        const finalFilename = filename.trim() || FILE_NAME;
        onConfirm(`${finalFilename}.json`);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h3>Exporter les données</h3>
                    <button className="modal-close" onClick={onCancel}>×</button>
                </div>
                <div className="modal-body">
                    <label htmlFor="filename">Nom du fichier:</label>
                    <input
                        type="text"
                        id="filename"
                        value={filename}
                        onChange={(e) => setFilename(e.target.value)}
                        className="filename-input"
                        placeholder="Nom du fichier"
                    />
                    <p className="filename-preview">{filename || FILE_NAME}.json</p>
                </div>
                <div className="modal-footer">
                    <button className="modal-btn cancel-btn" onClick={onCancel}>Annuler</button>
                    <button className="modal-btn confirm-btn" onClick={handleConfirm}>Exporter</button>
                </div>
            </div>
        </div>
    );
}

export default ExportModal;
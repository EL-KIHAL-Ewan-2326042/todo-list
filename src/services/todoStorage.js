/**
 * Service pour la gestion de la persistance des tâches
 * sans utiliser de serveur externe
 */

const STORAGE_KEY = 'tasks';

export const FILE_NAME = 'wan-todolist';

const todoStorage = {
    /**
     * Sauvegarder les données
     */
    saveData(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        console.log('Données sauvegardées:', data);
        return data;
    },

    /**
     * Charger les données
     */
    loadData() {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
        return data;
    },

    /**
     * Effacer les tâches
     */
    clearTasks(data) {
        const newData = { ...data, taches: [] };
        this.saveData(newData);
        return newData;
    },

    /**
     * Exporter les données
     */
    exportData(data, FILE_NAME = FILE_NAME) {
        const dataBlob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json'
        });
        this.downloadFile(dataBlob, FILE_NAME);
    },

    /**
     * Télécharger le fichier
     */
    downloadFile(blob, FILE_NAME) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = FILE_NAME;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    },

    /**
     * Importer les données
     */
    importData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    this.saveData(data);
                    resolve(data);
                } catch (error) {
                    reject(new Error('Fichier JSON invalide'));
                }
            };
            reader.onerror = () => reject(new Error('Erreur de lecture du fichier'));
            reader.readAsText(file);
        });
    }
};

export default todoStorage;
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle as fasSolidCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farRegularCircle } from '@fortawesome/free-regular-svg-icons';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import TodoList from './components/TodoList';
import CategoryForm from './components/CategoryForm/CategoryForm';
import todoStorage from './services/todoStorage';
import { initialData } from './services/initialData';
import './App.css';

// Importation des composants modulaires
import ExportModal from './components/modals/ExportModal';
import ConfirmModal from './components/modals/ConfirmModal/ConfirmModal';
import WelcomeModal from './components/modals/WelcomeModal/WelcomeModal';
import SelectionModal from './components/modals/SelectionModal/SelectionModal';
import TaskModal from './components/modals/TaskModal/TaskModal';
import FilterModal from './components/modals/FilterModal/FilterModal';
import HelpMenu from './components/modals/HelpMenu/HelpMenu';
import { isTaskExpiredMoreThanWeek } from './utils/dateUtils';

export const DEFAULT_SORT = 'dueDate';

function App() {
  const emptyData = {
    taches: [],
    categories: [],
    relations: []
  };

  const [data, setData] = useState(() => {
    const savedData = todoStorage.loadData();
    return savedData || emptyData;
  });

  const [filter, setFilter] = useState({
    status: 'all',
    sort: DEFAULT_SORT,
    startDate: null,
    endDate: null,
    createDateDirection: '>',
    dueDateDirection: '<'
  });

  const [formMode, setFormMode] = useState('task');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showSelectionModal, setShowSelectionModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showClearTasksModal, setShowClearTasksModal] = useState(false);
  const [showResetTasksModal, setShowResetTasksModal] = useState(false);
  const [filterIcon, setFilterIcon] = useState(<FontAwesomeIcon icon={fasSolidCircle} />);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState(DEFAULT_SORT);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [showConfirmAllTasks, setShowConfirmAllTasks] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const toggleFilterStatus = () => {
    if (filter.status === 'all') {
      setFilter({...filter, status: 'active'});
      setFilterIcon(<FontAwesomeIcon icon={faCircleHalfStroke} />);
    } else if (filter.status === 'active') {
      setFilter({...filter, status: 'completed'});
      setFilterIcon(<FontAwesomeIcon icon={farRegularCircle} />);
    } else {
      setFilter({...filter, status: 'all'});
      setFilterIcon(<FontAwesomeIcon icon={fasSolidCircle} />);
    }
  };

  // Charger les données du localStorage au chargement
  useEffect(() => {
    const savedData = todoStorage.loadData();
    setData(savedData || emptyData);
  }, []);

  useEffect(() => {
    if (data) {
      todoStorage.saveData(data);
    }
  }, [data]);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedTodoApp');

    if (!hasVisited) {
      setShowWelcomeModal(true);
    }
  }, []);

  const handleClearTasks = () => {
    setShowClearTasksModal(true);
  };

  const confirmClearTasks = () => {
    const newData = todoStorage.clearTasks(data);
    setData(newData);
    setShowClearTasksModal(false);
  };

  const handleResetTasks = () => {
    setShowResetTasksModal(true);
  };

  const confirmResetTasks = () => {
    setData(initialData);
    console.log("Tâches réinitialisées avec les données initiales");
    setShowResetTasksModal(false);
  };

  // Exporter les données au format JSON
  const handleExport = () => {
    setShowExportModal(true);
  };

  const confirmExport = (filename) => {
    todoStorage.exportData(data, filename);
    setShowExportModal(false);
  };

  const handleImport = (fileOrEvent) => {
    const file = fileOrEvent.target && fileOrEvent.target.files ?
        fileOrEvent.target.files[0] :
        fileOrEvent;

    todoStorage.importData(file)
        .then((importedData) => {
          setData(importedData);
          localStorage.setItem('hasVisitedTodoApp', 'true');
          setShowWelcomeModal(false);
        })
        .catch((error) => {
          alert('Erreur lors de l\'importation: ' + error.message);
        });
  };

  const handleStartFresh = () => {
    setData(emptyData);
    todoStorage.saveData(emptyData);
    localStorage.setItem('hasVisitedTodoApp', 'true');
    setShowWelcomeModal(false);
  };

  // Filtrer les tâches selon les critères
  const getFilteredTasks = () => {
    if (!data || !data.taches) return [];

    return data.taches
        .filter(tache => {
          if (filter.status === 'completed' && !tache.done) return false;
          if (filter.status === 'active' && tache.done) return false;

          const parseDate = (dateStr) => {
            if (!dateStr) return null;
            const parts = dateStr.includes('/')
                ? dateStr.split('/').map(p => parseInt(p, 10))
                : dateStr.split('-').map(p => parseInt(p, 10));

            const day = dateStr.includes('/') ? parts[0] : parts[2];
            const month = dateStr.includes('/') ? parts[1] - 1 : parts[1] - 1;
            const year = dateStr.includes('/') ? parts[2] : parts[0];

            return new Date(year, month, day);
          };

          if (searchQuery && searchQuery.length >= 3) {
            const query = searchQuery.toLowerCase();
            const titleMatch = tache.title && tache.title.toLowerCase().includes(query);
            const descMatch = tache.description && tache.description.toLowerCase().includes(query);
            if (!titleMatch && !descMatch) return false;
          }

          if (filter.createDateTarget) {
            const taskDate = parseDate(tache.date_creation);
            const targetDate = new Date(filter.createDateTarget);

            if (taskDate && filter.createDateDirection === '>') {
              if (taskDate < targetDate) return false;
            } else if (taskDate && filter.createDateDirection === '<') {
              if (taskDate > targetDate) return false;
            }
          }

          if (filter.dueDateTarget && tache.date_echeance) {
            const dueDate = parseDate(tache.date_echeance);
            const targetDate = new Date(filter.dueDateTarget);

            if (dueDate && filter.dueDateDirection === '>') {
              if (dueDate < targetDate) return false;
            } else if (dueDate && filter.dueDateDirection === '<') {
              if (dueDate > targetDate) return false;
            }
          }

          return true;
        })
        .sort((a, b) => {
          switch (activeFilter) {
            case 'name':
              return a.title.localeCompare(b.title);
            case 'date':
              const createDateSort = filter.createDateDirection === '>' ? -1 : 1;
              return createDateSort * (new Date(b.date_creation.split('/').reverse().join('-')) -
                  new Date(a.date_creation.split('/').reverse().join('-')));
            case 'dueDate':
              if (!a.date_echeance) return 1;
              if (!b.date_echeance) return -1;
              const dueDateSort = filter.dueDateDirection === '>' ? 1 : -1;
              return dueDateSort * (new Date(a.date_echeance.split('/').reverse().join('-')) -
                  new Date(b.date_echeance.split('/').reverse().join('-')));
            case 'category':
              const catA = getTaskCategories(a.id)[0]?.title || '';
              const catB = getTaskCategories(b.id)[0]?.title || '';
              return catA.localeCompare(catB);
            default:
              return 0;
          }
        })
        // Appliquer le filtre des tâches expirées APRÈS le tri
        .filter(tache => {
          return showAllTasks || !isTaskExpiredMoreThanWeek(tache);
        });
  };

  // Fonction pour ajouter une tâche
  const addTodo = (newTodo) => {
    const maxId = Math.max(...data.taches.map(t => t.id), 0);
    const newId = maxId + 1;

    const { selectedCategories, ...todoWithoutCategories } = newTodo;

    const todoWithId = {
      ...todoWithoutCategories,
      id: newId
    };

    setData(prev => ({
      ...prev,
      taches: [...prev.taches, todoWithId]
    }));

    if (selectedCategories && selectedCategories.length > 0) {
      selectedCategories.forEach(categoryId => {
        setData(prev => ({
          ...prev,
          relations: [...prev.relations, { tache: newId, categorie: categoryId }]
        }));
      });
    }
  };

  if (!data) return <div>Chargement...</div>;

  const filteredTasks = getFilteredTasks();

  const handleAddCategory = (newCategory) => {
    const maxId = Math.max(...data.categories.map(c => c.id), 0);
    const categoryWithId = {
      ...newCategory,
      id: maxId + 1
    };

    setData(prev => ({
      ...prev,
      categories: [...prev.categories, categoryWithId]
    }));
  };

  const getTaskCategories = (taskId) => {
    if (!data) return [];

    const relations = data.relations.filter(r => r.tache === taskId);

    return relations.map(relation =>
        data.categories.find(c => c.id === relation.categorie)
    ).filter(Boolean);
  };

  const toggleShowAllTasks = () => {
    if (!showAllTasks) {
      setShowConfirmAllTasks(true);
    } else {
      setShowAllTasks(false);
    }
  };

  const updateTask = (updatedTask) => {
    setData(prev => ({
      ...prev,
      taches: prev.taches.map(t =>
          t.id === updatedTask.id ? {...updatedTask} : t
      ),
      relations: prev.relations.filter(r => r.tache !== updatedTask.id)
    }));

    if (updatedTask.selectedCategories && updatedTask.selectedCategories.length > 0) {
      updatedTask.selectedCategories.forEach(categoryId => {
        setData(prev => ({
          ...prev,
          relations: [...prev.relations, { tache: updatedTask.id, categorie: categoryId }]
        }));
      });
    }
  };

  return (
      <div className="App">
        <header className="App-header">
          <h1>Ma To-Do List ✅</h1>

          <div className="form-mode-toggle">
            <button
                className="filter-toggle-btn"
                onClick={toggleFilterStatus}
                title={filter.status === 'all' ?
                    'Toutes les tâches' : filter.status === 'active' ?
                        'Tâches en cours' : 'Tâches terminées'}
            >
              {filterIcon}
            </button>

            <button
                className="filter-search-btn"
                onClick={() => setShowFilterModal(true)}
                aria-label="Filtrer et rechercher"
                title="Filtrer et rechercher"
            >
              <i className="fa-solid fa-filter"></i>
            </button>

            <div className="menu-container">
              <button
                  className="help-menu-btn"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Menu d'actions supplémentaires"
              >
                ?
              </button>
            </div>
          </div>

          <div className="todo-container">
            {formMode === 'task' ? (
                <>
                  <TodoList
                      tasks={filteredTasks}
                      toggleTask={(id) => {
                        setData(prev => ({
                          ...prev,
                          taches: prev.taches.map(t =>
                              t.id === id ? { ...t, done: !t.done } : t
                          )
                        }));
                      }}
                      deleteTask={(id) => {
                        setData(prev => ({
                          ...prev,
                          taches: prev.taches.filter(t => t.id !== id),
                          relations: prev.relations.filter(r => r.tache !== id)
                        }));
                      }}
                      updateTask={updateTask}
                      allCategories={data.categories}
                      getCategories={getTaskCategories}
                  />
                </>
            ) : (
                <CategoryForm addCategory={handleAddCategory} categories={data.categories} />
            )}
          </div>
        </header>

        {/* Bouton flottant pour ajouter une tâche */}
        <button
            className="add-task-btn"
            onClick={() => setShowSelectionModal(true)}
            aria-label="Ajouter une tâche ou gérer les catégories"
        >
          +
        </button>

        {/* Utilisation des composants modulaires */}
        <SelectionModal
            isOpen={showSelectionModal}
            onClose={() => setShowSelectionModal(false)}
            onTaskSelect={() => {
              setShowSelectionModal(false);
              setShowTaskModal(true);
            }}
            onCategorySelect={() => {
              setShowSelectionModal(false);
              setShowCategoryModal(true);
            }}
        />

        <TaskModal
            isOpen={showTaskModal}
            onClose={() => setShowTaskModal(false)}
            onAddTodo={addTodo}
            categories={data.categories}
        />

        <FilterModal
            isOpen={showFilterModal}
            onClose={() => setShowFilterModal(false)}
            filter={filter}
            setFilter={setFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            position="top-right"
        />

        <HelpMenu
            isOpen={menuOpen}
            onClose={() => setMenuOpen(false)}
            onExport={handleExport}
            onImport={handleImport}
            onClearTasks={handleClearTasks}
            onResetTasks={handleResetTasks}
            onShowAllTasks={toggleShowAllTasks}
            showAllTasks={showAllTasks}
        />

        {showCategoryModal && (
            <div className="modal-overlay bottom-right">
              <div className="task-modal-container" >
                <div className="modal-header">
                  <h3>Gérer les catégories</h3>
                  <button
                      className="modal-close"
                      onClick={() => setShowCategoryModal(false)}
                  >
                    ×
                  </button>
                </div>
                <div className="modal-body">
                  <CategoryForm
                      addCategory={handleAddCategory}
                      categories={data.categories}
                  />
                </div>
              </div>
            </div>
        )}

        <ExportModal
            isOpen={showExportModal}
            onConfirm={confirmExport}
            onCancel={() => setShowExportModal(false)}
        />

        <ConfirmModal
            isOpen={showClearTasksModal}
            title="Confirmer la suppression"
            message="Êtes-vous sûr de vouloir supprimer toutes les tâches ?"
            onConfirm={confirmClearTasks}
            onCancel={() => setShowClearTasksModal(false)}
        />

        <ConfirmModal
            isOpen={showResetTasksModal}
            title="Confirmer la réinitialisation"
            message="Êtes-vous sûr de vouloir réinitialiser les tâches avec les données par défaut ?"
            onConfirm={confirmResetTasks}
            onCancel={() => setShowResetTasksModal(false)}
        />

        <ConfirmModal
            isOpen={showConfirmAllTasks}
            title="Afficher toutes les tâches"
            message="Voulez-vous afficher toutes les tâches, y compris celles dont la date d'échéance est dépassée depuis plus d'une semaine ?"
            onConfirm={() => {
              setShowAllTasks(true);
              setShowConfirmAllTasks(false);
            }}
            onCancel={() => setShowConfirmAllTasks(false)}
        />

        {showWelcomeModal && (
            <WelcomeModal
                onImport={handleImport}
                onStartFresh={handleStartFresh}
            />
        )}
      </div>
  );
}

export default App;
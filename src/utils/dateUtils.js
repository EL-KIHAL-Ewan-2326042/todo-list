export const isTaskExpiredMoreThanWeek = (task) => {
    if (!task.date_echeance) return false;

    const [day, month, year] = task.date_echeance.split('/').map(Number);
    const dueDate = new Date(year, month - 1, day);

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    weekAgo.setHours(0, 0, 0, 0);

    return dueDate < weekAgo;
};

// Vérifie si la date d'échéance approche (moins d'une semaine)
export const isTaskApproachingDeadline = (task) => {
    if (!task.date_echeance) return false;
    
    const [day, month, year] = task.date_echeance.split('/').map(Number);
    const dueDate = new Date(year, month - 1, day);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const oneWeekLater = new Date(today);
    oneWeekLater.setDate(today.getDate() + 7);
    
    return dueDate >= today && dueDate <= oneWeekLater;
};

// Vérifie si la date d'échéance est dépassée de moins d'une semaine
export const isTaskRecentlyExpired = (task) => {
    if (!task.date_echeance) return false;
    
    const [day, month, year] = task.date_echeance.split('/').map(Number);
    const dueDate = new Date(year, month - 1, day);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);
    
    return dueDate < today && dueDate >= weekAgo;
};
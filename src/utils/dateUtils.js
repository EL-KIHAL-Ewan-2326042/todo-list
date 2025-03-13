export const isTaskExpiredMoreThanWeek = (task) => {
    if (!task.date_echeance) return false;

    const [day, month, year] = task.date_echeance.split('/').map(Number);
    const dueDate = new Date(year, month - 1, day);

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    weekAgo.setHours(0, 0, 0, 0);

    return dueDate < weekAgo;
};
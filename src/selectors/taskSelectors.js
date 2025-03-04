import { createSelector } from 'reselect';

const getTasks = (state) => state.tasks.tasks;
export const selectTasks = createSelector([getTasks], (tasks) => tasks);

export const selectSortedTasks = createSelector([getTasks], (tasks) =>
  tasks.slice().sort((a, b) => a.text.localeCompare(b.text))
);

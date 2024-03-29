import { useReducer, useState } from 'react';

export const orderByDate = (items, criteria) => {
  return {
    asc: items
      .slice()
      .sort((a, b) => new Date(a[criteria]) - new Date(b[criteria])),
    desc: items
      .slice()
      .sort((a, b) => new Date(b[criteria]) - new Date(a[criteria])),
  };
};

export const orderByPriority = (items) => {
  return {
    asc: items.slice().sort((a, b) => a.priority - b.priority),
    desc: items.slice().sort((a, b) => b.priority - a.priority),
  };
};

export const orderByAlphabet = (items, criteria) => {
  return {
    asc: items.slice().sort((a, b) => (a[criteria] > b[criteria] ? 1 : -1)),
    desc: items.slice().sort((a, b) => (a[criteria] > b[criteria] ? -1 : 1)),
  };
};

const useOrderBy = (rawTasks = [], rawProjects = [], rawTeams = []) => {
  rawTasks = Object.freeze(rawTasks);
  rawProjects = Object.freeze(rawProjects);
  rawTeams = Object.freeze(rawTeams);

  const initialState = {
    tasks: orderByDate(rawTasks, 'endDate'),
    projects: orderByDate(rawProjects, 'endDate'),
    teams: orderByDate(rawTeams, 'createdAt'),
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'orderByDate':
        return {
          ...state,
          tasks: orderByDate(rawTasks, 'endDate'),
          projects: orderByDate(rawProjects, 'endDate'),
          teams: orderByDate(rawTeams, 'createdAt'),
        };

      case 'orderByPriority':
        return {
          ...state,
          tasks: orderByPriority(rawTasks),
          projects: orderByPriority(rawProjects),
        };

      case 'orderByAlphabet':
        return {
          ...state,
          tasks: orderByAlphabet(rawTasks, 'name'),
          projects: orderByAlphabet(rawProjects, 'name'),
          teams: orderByAlphabet(rawTeams, 'name'),
        };

      case 'init':
        return initialState;

      default:
        return state;
    }
  };

  const [{ tasks, projects, teams }, dispatch] = useReducer(reducer, {});

  const [isAsc, setIsAsc] = useState(false);
  const order = () => (isAsc ? 'asc' : 'desc');

  return {
    tasks: tasks ?? initialState.tasks,
    projects: projects ?? initialState.projects,
    teams: teams ?? initialState.teams,
    setIsAsc,
    order,
    onOrderByDate: () => dispatch({ type: 'orderByDate' }),
    onOrderByPriority: () => dispatch({ type: 'orderByPriority' }),
    onOrderByAlphabet: () => dispatch({ type: 'orderByAlphabet' }),
  };
};

export default useOrderBy;

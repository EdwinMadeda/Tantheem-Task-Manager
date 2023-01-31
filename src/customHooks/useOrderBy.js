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

const useOrderBy = (rawTasks, rawProjects, rawTeams) => {};

export default useOrderBy;

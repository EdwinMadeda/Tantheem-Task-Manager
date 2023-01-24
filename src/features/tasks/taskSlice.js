import { createSlice } from "@reduxjs/toolkit";

export const PRIORITY = Object.freeze({
    HIGH : 'High',
    MEDIUM : 'Medium',
    LOW : 'Low',
});

const initialState = [
    {
        id : 0,
        name : 'Interview Questions',
        description : '',
        // team : 'UX Team',
        teamId: 0,
        dueDate : new Date().toISOString(),
        startDate: '',
        endDate: '',
        reminder : false,
        isComplete : false,
        priority : PRIORITY.HIGH,
    },
    {
        id : 1,
        name : 'Business Research',
        description : '',
        // team : 'UX Team',
        teamId: 0,
        dueDate : new Date().toISOString(),
        startDate: '',
        endDate: '',
        reminder : false,
        isComplete : false,
        priority : PRIORITY.MEDIUM,
    },
    {
        id : 2,
        name : 'Homework - 11th week',
        description : '',
        dueDate : new Date().toISOString(),
        startDate: '',
        endDate: '',
        reminder : false,
        isComplete : false,
        priority : PRIORITY.LOW,
    },
    {
        id : 3,
        name : 'Designing the system',
        description : '',
        // team : 'UI Team',
        teamId: 1,
        dueDate : new Date().toISOString(),
        startDate: '',
        endDate: '',
        reminder : false,
        isComplete : false,
        priority : PRIORITY.MEDIUM,
    },
    {
        id : 4,
        name : 'Testing',
        description : '',
        // team : 'Testing Team',
        teamId: 2,
        dueDate : new Date().toISOString(),
        startDate: '',
        endDate: '',
        reminder : false,
        isComplete : false,
        priority : PRIORITY.HIGH,
    },
    {
        id : 5,
        name : 'Homework - 12th week',
        description : '',
        dueDate : new Date().toISOString(),
        startDate: '',
        endDate: '',
        reminder : false,
        isComplete : false,
        priority : PRIORITY.LOW,
    }
];

const tasksSlice = createSlice({
    name : 'tasks',
    initialState,
    reducers : {},
});


export const selectAllTasks = state => state.tasks;
export const selectLatestTask = state => state.tasks[state.tasks.length-1];

export const selectTasksByTeam = (state, teamId) => state.tasks.filter(task => task.teamId === teamId);

export default tasksSlice.reducer;

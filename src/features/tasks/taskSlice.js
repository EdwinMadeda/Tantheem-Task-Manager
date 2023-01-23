import { createSlice } from "@reduxjs/toolkit";

const PRIORITY = Object.freeze({
    HIGH : 'High',
    MEDIUM : 'Medium',
    LOW : 'Low',
});

const initialState = [
    {
        id : 0,
        name : 'Interview Questions',
        description : '',
        team : 'UX Team',
        dueDate : new Date(),
        reminder : false,
        isComplete : false,
        priority : PRIORITY.HIGH,
    },
    {
        id : 1,
        name : 'Business Research',
        description : '',
        team : 'UX Team',
        dueDate : new Date(),
        reminder : false,
        isComplete : false,
        priority : PRIORITY.MEDIUM,
    },
    {
        id : 2,
        name : 'Homework - 11th week',
        description : '',
        dueDate : new Date(),
        reminder : false,
        isComplete : false,
        priority : PRIORITY.LOW,
    },
    {
        id : 3,
        name : 'Designing the system',
        description : '',
        team : 'UI Team',
        dueDate : new Date(),
        reminder : false,
        isComplete : false,
        priority : PRIORITY.MEDIUM,
    },
    {
        id : 4,
        name : 'Testing',
        description : '',
        team : 'Testing Team',
        dueDate : new Date(),
        reminder : false,
        isComplete : false,
        priority : PRIORITY.HIGH,
    },
    {
        id : 5,
        name : 'Homework - 12th week',
        description : '',
        dueDate : new Date(),
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
export default tasksSlice.reducer;

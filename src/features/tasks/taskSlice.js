import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id : 0,
        name : 'Interview Questions',
        description : '',
        team : 'UX Team',
        dueDate : new Date(),
        reminder : false,
        isComplete : false,
    },
    {
        id : 1,
        name : 'Business Research',
        description : '',
        team : 'UX Team',
        dueDate : new Date(),
        reminder : false,
        isComplete : false,
    },
    {
        id : 2,
        name : 'Homework - 11th week',
        description : '',
        dueDate : new Date(),
        reminder : false,
        isComplete : false,
    },
    {
        id : 3,
        name : 'Designing the system',
        description : '',
        team : 'UI Team',
        dueDate : new Date(),
        reminder : false,
        isComplete : false,
    },
    {
        id : 4,
        name : 'Testing',
        description : '',
        team : 'Testing Team',
        dueDate : new Date(),
        reminder : false,
        isComplete : false,
    },
    {
        id : 5,
        name : 'Homework - 11th week',
        description : '',
        dueDate : new Date(),
        reminder : false,
        isComplete : false,
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

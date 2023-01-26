import { createSlice } from "@reduxjs/toolkit";

export const PRIORITY = Object.freeze({
    HIGH : 'High',
    MEDIUM : 'Medium',
    LOW : 'Low',
});

export const STATUS = Object.freeze({
    IN_PROGRESS : 'In Progress',
    COMPLETE : 'Complete',
    TO_DO : 'To Do',
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
        subTasks : [],
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
        subTasks : [],
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
        subTasks : [],
    },
    {
        id : 3,
        name : 'Designing the system',
        description : ' Involves defining elements of a system like modules, architecture, components and their interfaces and data for a system based on the specified requirements',
        // team : 'UI Team',
        teamId: 1,
        dueDate : new Date().toISOString(),
        startDate: '',
        endDate: '',
        reminder : false,
        isComplete : false,
        priority : PRIORITY.MEDIUM,
        subTasks : [
            {
                id : 0,
                name : 'Sketching',
                description : '',
                startDate: '',
                endDate: '',
                reminder : false,
                isComplete : true,
                priority : PRIORITY.HIGH,
            },
            {
                id : 2,
                name : 'Creating Mockups',
                description : '',
                startDate: '',
                endDate: '',
                reminder : false,
                isComplete : false,
                priority : PRIORITY.HIGH,
            },
            {
                id : 3,
                name : 'Final Design',
                description : '',
                startDate: '',
                endDate: '',
                reminder : false,
                isComplete : false,
                priority : PRIORITY.HIGH,
            },
        ],
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
        subTasks : [],
    }
];

const tasksSlice = createSlice({
    name : 'tasks',
    initialState,
    reducers : {},
});


export const selectAllTasks = state => state.tasks;
export const selectLatestTask = state => state.tasks[state.tasks.length-1];
export const selectTaskById = (state, id) => state.tasks.find(task => task.id === id);

export const selectOneTask = (state, taskId) => {
    const selectTask = selectTaskById(state, taskId);
    let toDo = [], 
        complete = [],
        completeSubTasks = 0,
        totalSubTasks = 0;

    if(selectTask?.subTasks){
   
        toDo = selectTask.subTasks.filter(subTask => !subTask.isComplete);
        complete= selectTask.subTasks.filter(subTask => subTask.isComplete);

        completeSubTasks = complete.length;
        totalSubTasks = selectTask.subTasks.length;
    }

    return {    
                selectTask, 
                subTasks : {toDo, complete}, 
                completeSubTasks, 
                totalSubTasks,
          };
};


export const selectTasksByTeam = (state, teamId) => state.tasks.filter(task => task.teamId === teamId);

export default tasksSlice.reducer;

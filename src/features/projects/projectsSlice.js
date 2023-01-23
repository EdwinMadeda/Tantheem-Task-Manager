import { createSlice } from "@reduxjs/toolkit";

const STATUS = Object.freeze({
    IN_PROGRESS : 'In Progress',
    COMPLETE : 'Complete',
    TO_DO : 'To Do',
});

const PRIORITY = Object.freeze({
    HIGH : 'High',
    MEDIUM : 'Medium',
    LOW : 'Low',
});

const initialState = [
    {
        id: 0,
        name : 'UX case study',
        status : STATUS.COMPLETE,
        priority : PRIORITY.HIGH,
        teamID : 0, 
        deliverables : [
            {
                id: 0,
                name: 'Plot',
                status: STATUS.COMPLETE,
                description: 'ABCD..',
            },
            {
                id: 1,
                name: 'Character',
                status: STATUS.COMPLETE,
                description: 'ABCD..',
            },
            {
                id: 2,
                name: 'Theme',
                status: STATUS.IN_PROGRESS,
                description: 'ABCD..',
            },
            {
                id: 3,
                name: 'Diction',
                status: STATUS.TO_DO,
                description: 'ABCD..',
            },
            {
                id: 4,
                name: 'Melody',
                status: STATUS.TO_DO,
                description: 'ABCD..',
            },
            ],
    },
    {
        id: 1,
        name : 'Data base',
        status : STATUS.IN_PROGRESS,
        priority : PRIORITY.MEDIUM,
        teamID : 1, 
        deliverables : [
            {   
                id: 0,
                name: 'Determine the purpose of your database',
                status: STATUS.COMPLETE,
                description: 'ABCD..',
            },
            {
                id: 1,
                name: 'Find and organize the information required',
                status: STATUS.TO_DO,
                description: 'ABCD..',
            },
                
            {
                id: 2,
                name: 'Divide the information into tables',
                status: STATUS.TO_DO,
                description: 'ABCD..',
            },
            {
                id: 3,
                name: 'Turn information items into columns',
                status: STATUS.TO_DO,
                description: 'ABCD..',
            },
            {
                id: 4,
                name: 'Specify primary keys',
                status: STATUS.TO_DO,
                description: 'ABCD..',
            },
            {
                id: 5,
                name: 'Set up the table relationships',
                status: STATUS.TO_DO,
                description: 'ABCD..',
            },
            {
                id: 6,
                name: 'Refine your design',
                status: STATUS.TO_DO,
                description: 'ABCD..',
            },
            {
                id: 7,
                name: 'Apply the normalization rules',
                status: STATUS.TO_DO,
                description: 'ABCD..',
            }
        ]
    }
];

const projectsSlice = createSlice({
    name : 'projects',
    initialState,
    reducers : {},
});

export const selectAllProjects = state => state.projects;
export const selectLatestProject = state => state.projects[state.projects.length-1];

export const totalDeliverablesCount = (state, id) => {
    const targetProject = state.projects.find(project => project.id === id);
    const deliverables = targetProject?.deliverables;
    if(deliverables)
        return targetProject?.deliverables?.length;
        return 0;
}
export const completeDeliverablesCount = (state, id) => {
    const targetProject = state.projects.find(project => project.id === id);
    const deliverables = targetProject?.deliverables;
    if(deliverables){
        return deliverables.filter(deliverable => deliverable.status === STATUS.COMPLETE);
    }
    return 0;
}

export default projectsSlice.reducer;
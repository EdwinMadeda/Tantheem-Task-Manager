import { createSlice } from "@reduxjs/toolkit";

export const STATUS = Object.freeze({
    IN_PROGRESS : 'In Progress',
    COMPLETE : 'Complete',
    TO_DO : 'To Do',
});

export const PRIORITY = Object.freeze({
    HIGH : 'High',
    MEDIUM : 'Medium',
    LOW : 'Low',
});

const initialState = [
    {
        id: 0,
        name : 'UX case study',
        description : 'ABCD...',
        status : STATUS.COMPLETE,
        priority : PRIORITY.HIGH,
        startDate: '',
        endDate: '',
        teamId : 0, 
        deliverables : [
            {
                id: 0,
                name: 'Plot',
                status: STATUS.COMPLETE,
                description: 'ABCD..',
                priority : PRIORITY.HIGH,
                startDate: '',
                endDate: '',
            },
            {
                id: 1,
                name: 'Character',
                status: STATUS.COMPLETE,
                description: 'ABCD..',
                priority : PRIORITY.HIGH,
                startDate: '',
                endDate: '',
            },
            {
                id: 2,
                name: 'Theme',
                status: STATUS.IN_PROGRESS,
                description: 'ABCD..',
                priority : PRIORITY.HIGH,
                startDate: '',
                endDate: '',
            },
            {
                id: 3,
                name: 'Diction',
                status: STATUS.TO_DO,
                description: 'ABCD..',
                priority : PRIORITY.HIGH,
                startDate: '',
                endDate: '',
            },
            {
                id: 4,
                name: 'Melody',
                status: STATUS.TO_DO,
                description: 'ABCD..',
                priority : PRIORITY.HIGH,
                startDate: '',
                endDate: '',
            },
            ],
    },
    {
        id: 1,
        name : 'Data base',
        description : 'ABCD...',
        status : STATUS.IN_PROGRESS,
        priority : PRIORITY.MEDIUM,
        teamId : 1, 
        startDate: '',
        endDate: '',
        deliverables : [
            {   
                id: 0,
                name: 'Determine the purpose of your database',
                status: STATUS.COMPLETE,
                description: 'ABCD..',
                priority : PRIORITY.HIGH,
                startDate: '',
                endDate: '',
            },
            {
                id: 1,
                name: 'Find and organize the information required',
                status: STATUS.TO_DO,
                description: 'ABCD..',
                priority : PRIORITY.HIGH,
                startDate: '',
                endDate: '',
            },
                
            {
                id: 2,
                name: 'Divide the information into tables',
                status: STATUS.TO_DO,
                description: 'ABCD..',
                priority : PRIORITY.HIGH,
                startDate: '',
                endDate: '',
            },
            {
                id: 3,
                name: 'Turn information items into columns',
                status: STATUS.TO_DO,
                description: 'ABCD..',
                priority : PRIORITY.HIGH,
                startDate: '',
                endDate: '',
            },
            {
                id: 4,
                name: 'Specify primary keys',
                status: STATUS.TO_DO,
                description: 'ABCD..',
                priority : PRIORITY.HIGH,
                startDate: '',
                endDate: '',
            },
            {
                id: 5,
                name: 'Set up the table relationships',
                status: STATUS.TO_DO,
                description: 'ABCD..',
                priority : PRIORITY.HIGH,
                startDate: '',
                endDate: '',
            },
            {
                id: 6,
                name: 'Refine your design',
                status: STATUS.TO_DO,
                description: 'ABCD..',
                priority : PRIORITY.HIGH,
                startDate: '',
                endDate: '',
            },
            {
                id: 7,
                name: 'Apply the normalization rules',
                status: STATUS.TO_DO,
                description: 'ABCD..',
                priority : PRIORITY.HIGH,
                startDate: '',
                endDate: '',
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

export const selectProjectsByTeam = (state, teamId) => {
    return state.projects.filter(project => project.teamId === teamId);
}

export const selectOneProject = (state, projectId) => {
    const selectProject = state.projects.find(project => project.id === projectId);
    let toDo = [], 
        inProgress = [], 
        complete = [],
        completeDeliverables = 0,
        totalDeliverables = 0;

    if(selectProject?.deliverables){
        const filterProject = status => (
            selectProject.deliverables.filter(deliverable => deliverable.status === status)
        );

        toDo = filterProject(STATUS.TO_DO);
        inProgress = filterProject(STATUS.IN_PROGRESS);
        complete= filterProject(STATUS.COMPLETE);

        completeDeliverables = complete.length;
        totalDeliverables = selectProject.deliverables.length;
    }

    return {    
                selectProject, 
                deliverables : {toDo, inProgress, complete}, 
                completeDeliverables, 
                totalDeliverables
          };
};


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
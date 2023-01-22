import { createSlice } from "@reduxjs/toolkit";

export const STATUS = Object.freeze({
    IN_PROGRESS : 'In Progress',
    COMPLETE : 'Complete',
    TO_DO : 'To Do',
});

export const PRIORITY = Object.freeze({
    HIGH : 'high',
    MEDIUM : 'medium',
    LOW : 'low',
});

const initialState = [
    {
        id: 0,
        name : 'UX case study',
        status : STATUS.COMPLETE,
        priority : PRIORITY.HIGH,
    },
    {
        id: 1,
        name : 'Data base',
        status : STATUS.IN_PROGRESS,
        priority : PRIORITY.HIGH,
    }
];

const projectsSlice = createSlice({
    name : 'projects',
    initialState,
    reducers : {},
});

export const selectAllProjects = state => state.projects;
export const selectLatestProject = state => state.projects[state.projects.length-1];
export default projectsSlice.reducer;
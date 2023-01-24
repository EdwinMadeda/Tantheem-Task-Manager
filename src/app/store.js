import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/taskSlice";
import projectsReducer from "../features/projects/projectsSlice";
import teamsReducer from "../features/teams/teamsSlice";


export const store = configureStore({
    reducer : {
        tasks : tasksReducer,
        projects : projectsReducer,
        teams : teamsReducer
    }
});
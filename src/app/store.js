import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/taskSlice";
import projectsReducer from "../features/projects/projectsSlice";
import teamsReducer from "../features/teams/teamsSlice";
import viewMoreReducer from "../features/viewMore/viewMoreSlice";
import prevLocationReducer from "../features/prevLocation/prevLocationSlice";


export const store = configureStore({
    reducer : {
        tasks : tasksReducer,
        projects : projectsReducer,
        teams : teamsReducer,
        viewMore: viewMoreReducer,
        prevLocation: prevLocationReducer,
    }
});
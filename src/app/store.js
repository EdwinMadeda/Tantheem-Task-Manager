import { configureStore } from '@reduxjs/toolkit';

import tasksReducer from '../features/tasks/taskSlice';
import projectsReducer from '../features/projects/projectsSlice';
import teamsReducer from '../features/teams/slice/teamsSlice';
import invitesReducer from '../features/teams/slice/inviteSlice';

import viewMoreReducer from '../features/viewMore/viewMoreSlice';
import searchReducer from '../features/search/searchSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    projects: projectsReducer,
    teams: teamsReducer,
    invites: invitesReducer,
    viewMore: viewMoreReducer,
    searchText: searchReducer,
    user: userReducer,
  },
});

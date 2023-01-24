import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id : 0,
        name : 'UX Team',
        description: '',
        memberIDs : [],
        taskIDs : [],
    },
    {
        id : 1,
        name : 'CSS 3144',
        description: '',
        memberIDs : [],
        taskIDs : [],
    },
    {
        id : 2,
        name : 'Calc III',
        description: '',
        memberIDs : [],
        taskIDs : [],
    }
];

const teamsSlice = createSlice({
    name : 'teams',
    initialState,
    reducers : {},
})

export const selectAllTeams = state => state.teams;
export const selectLatestTeam = state => state.teams[state.teams.length-1];
export const selectOneTeam = (state, teamId) => state.teams.find(team => team.id === teamId);

export default teamsSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id : 0,
        name : 'UX Team',
        memberIDs : [],
    },
    {
        id : 1,
        name : 'CSS 3144',
        memberIDs : [],
    },
    {
        id : 2,
        name : 'Calc III',
        memberIDs : [],
    }
];

const teamsSlice = createSlice({
    name : 'teams',
    initialState,
    reducers : {},
})

export const selectAllTeams = state => state.teams;
export const selectLatestTeam = state => state.teams[state.teams.length-1];

export default teamsSlice.reducer;
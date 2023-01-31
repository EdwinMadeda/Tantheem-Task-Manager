import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 0,
    name: "UX Team",
    description: "",
    memberIDs: [],
    taskIDs: [],
    createdAt: new Date("2022-03-27").toISOString(),
  },
  {
    id: 1,
    name: "CSS 3144",
    description: "",
    memberIDs: [],
    taskIDs: [],
    createdAt: new Date("2022-03-24").toISOString(),
  },
  {
    id: 2,
    name: "Calc III",
    description: "",
    memberIDs: [],
    taskIDs: [],
    createdAt: new Date("2022-03-28").toISOString(),
  },
];

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
});

export const selectAllTeams = (state) => state.teams;
export const selectLatestTeam = (state) => state.teams[state.teams.length - 1];
export const selectTeamById = (state, teamId) =>
  state.teams.find((team) => team.id === teamId);

export default teamsSlice.reducer;

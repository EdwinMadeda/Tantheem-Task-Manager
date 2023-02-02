import { createSlice } from "@reduxjs/toolkit";
import format from "date-fns/format";

const initialState = [
  {
    id: 0,
    name: "UX Team",
    description: "",
    memberIDs: [],
    taskIDs: [],
    createdAt: format(new Date("2022-03-27"), "yyyy-MM-dd"),
  },
  {
    id: 1,
    name: "CSS 3144",
    description: "",
    memberIDs: [],
    taskIDs: [],
    createdAt: format(new Date("2022-03-24"), "yyyy-MM-dd"),
  },
  {
    id: 2,
    name: "Calc III",
    description: "",
    memberIDs: [],
    taskIDs: [],
    createdAt: format(new Date("2022-03-28"), "yyyy-MM-dd"),
  },
];

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    addTeam(state, action) {
      const id = state.length + 1;
      state.push({
        id,
        ...action.payload,
        memberIDs: [],
        taskIDs: [],
        createdAt: format(new Date(), "yyyy-MM-dd"),
      });
    },
    editTeam(state, action) {
      return state.map((team) =>
        team.id === action.payload.id ? action.payload : team
      );
    },
  },
});

export const selectAllTeams = (state) => state.teams;
export const selectLatestTeam = (state) => state.teams[state.teams.length - 1];
export const selectTeamById = (state, teamId) =>
  state.teams.find((team) => team.id === teamId);

export const { addTeam, editTeam } = teamsSlice.actions;
export default teamsSlice.reducer;

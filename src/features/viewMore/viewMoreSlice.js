import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  TasksPreviousWork: false,
  TasksToDo: false,
  TeamsToDo: false,
};

const viewMoreSlice = createSlice({
  name: "viewMore",
  initialState,
  reducers: {
    setViewMoreTasksToDo(state, action) {
      state.TasksToDo = action.payload;
    },
    setViewMorePreviousWork(state, action) {
      state.TasksPreviousWork = action.payload;
    },
    setViewMoreTeamsToDo(state, action) {
      state.TeamsToDo = action.payload;
    },
  },
});

export const selectViewMorePreviousWork = (state) =>
  state.viewMore.TasksPreviousWork;
export const selectViewMoreTasksToDo = (state) => state.viewMore.TasksToDo;
export const selectViewMoreTeamsToDo = (state) => state.viewMore.TeamsToDo;

export const {
  setViewMoreTasksToDo,
  setViewMorePreviousWork,
  setViewMoreTeamsToDo,
} = viewMoreSlice.actions;
export default viewMoreSlice.reducer;

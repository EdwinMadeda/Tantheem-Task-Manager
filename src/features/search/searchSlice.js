import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchText",
  initialState: { searchText: "" },
  reducers: {
    input(state, action) {
      state.searchText = action.payload;
    },
  },
});

export const selectSearchText = (state) => state.searchText.searchText;
export const { input } = searchSlice.actions;
export default searchSlice.reducer;

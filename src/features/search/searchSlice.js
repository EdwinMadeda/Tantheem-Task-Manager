import { createSlice } from '@reduxjs/toolkit';

const initialState = { searchText: '' };
const searchSlice = createSlice({
  name: 'searchText',
  initialState,
  reducers: {
    input(state, action) {
      state.searchText = action.payload;
    },
    reset(state, action) {
      state.searchText = '';
    },
  },
});

export const selectSearchText = (state) => state.searchText.searchText;
export const { input } = searchSlice.actions;
export default searchSlice.reducer;

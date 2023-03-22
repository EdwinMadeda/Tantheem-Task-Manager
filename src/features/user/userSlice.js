import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: { name: 'Nana_Ray', email: 'nanaray@gmail.com' },
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    ...initialState,
  },
  reducers: {},
});

export const selectUser = (state) => state.user.info;

export const { signOut } = userSlice.actions;
export default userSlice.reducer;

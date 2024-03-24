import { createSlice } from '@reduxjs/toolkit';

const navSlice = createSlice({
  name: 'nav',
  initialState: {
    currentPage: ''
  },
  reducers: {
    updateCurrentPage(state, action) {
      state.currentPage = action.payload;
    }
  }
});

export const selectCurrentPage = (state: { nav: { currentPage: string; }; }) => state.nav.currentPage;

export const { updateCurrentPage } = navSlice.actions;

export default navSlice.reducer;
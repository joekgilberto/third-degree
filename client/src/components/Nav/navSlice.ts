import { createSlice } from '@reduxjs/toolkit';

//TODO: make username and author specific to logged in user
const navSlice = createSlice({
  name: 'nav',
  initialState: {
    currentPage: ''
  },
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    }
  }
})

export const selectCurrentPage = (state: { nav: { currentPage: string; }; }) => state.nav.currentPage;

export const { setCurrentPage } = navSlice.actions

export default navSlice.reducer
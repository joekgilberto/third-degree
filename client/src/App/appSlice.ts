import { createSlice } from '@reduxjs/toolkit';
import { User } from '../utilities/types';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    user: {
        id: '',
        username: '',
        submissions: [],
        clearance: 0
    },
    isLoadingUser: false,
    hasUserError: false
  },
  reducers: {
    updateUser(state, action) {
      state.user = action.payload;
    }
  }
})

export const selectUser = (state: { app: { user: User; }; }) => state.app.user;

export const isLoading = (state: { app: { isLoadingUser: boolean; }; }) => state.app.isLoadingUser;

export const hasError = (state: { app: { hasUserError: boolean; }; }) => state.app.hasUserError;

export const { updateUser } = appSlice.actions

export default appSlice.reducer
import { createSlice } from '@reduxjs/toolkit';
import { Credentials } from '../../utilities/types';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        credentials: {
            username: '',
            password: ''
        },
        reEnter: ''
    },
    reducers: {
        updateCredentials(state, action) {
            state.credentials = action.payload;
        },
        updateReEnter(state, action) {
            state.reEnter = action.payload;
        }
    }
})

export const selectCredentials = (state: { auth: { credentials: Credentials; }; }) => state.auth.credentials;
export const selectReEnter = (state: { auth: { reEnter: string; }; }) => state.auth.reEnter;

export const { updateCredentials, updateReEnter } = authSlice.actions;

export default authSlice.reducer;
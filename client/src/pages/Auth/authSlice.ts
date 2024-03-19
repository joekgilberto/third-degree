import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../utilities/types';

//TODO: make username and author specific to logged in user
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        credentials: {
            username: '',
            password: '',
            submissions: [],
            clearance: 0
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

export const selectCredentials = (state: { auth: { credentials: User; }; }) => state.auth.credentials;
export const selectReEnter = (state: { auth: { reEnter: string; }; }) => state.auth.reEnter;

export const { updateCredentials, updateReEnter } = authSlice.actions

export default authSlice.reducer
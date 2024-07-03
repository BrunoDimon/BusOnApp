import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    refreshToken: null,
};
//a
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
        },
        refreshUser(state, action) {
            state.user = action.payload;
        },
        refreshToken(state, action) {
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.refreshToken = null;
        },
    },
});

export const { login, logout, refreshUser, refreshToken } = authSlice.actions;

export default authSlice.reducer;

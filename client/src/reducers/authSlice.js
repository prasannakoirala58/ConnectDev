import { createSlice } from '@reduxjs/toolkit';
import { register, loadUser, login, logout } from './authThunk';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    // registering a user
    [register.pending]: (state, action) => {
      return { loading: true };
    },

    [register.fulfilled]: (state, { payload }) => {
      localStorage.setItem('token', payload.token);
      return { state, payload, isAuthenticated: true, loading: false };
    },

    [register.rejected]: (state, action) => {
      localStorage.removeItem('token');
      return { state, token: null, isAuthenticated: false, loading: false };
    },

    // logging in a user
    [login.pending]: (state, action) => {
      return { loading: true };
    },

    [login.fulfilled]: (state, { payload }) => {
      localStorage.setItem('token', payload.token);
      return { state, payload, isAuthenticated: true, loading: false };
    },

    [login.rejected]: (state, action) => {
      localStorage.removeItem('token');
      return { state, token: null, isAuthenticated: false, loading: false };
    },

    // loading a user
    [loadUser.pending]: (state, action) => {
      return { loading: true };
    },

    [loadUser.fulfilled]: (state, { payload }) => {
      // const { type, payload } = action;
      return { state, isAuthenticated: true, loading: false, user: payload };
    },

    [loadUser.rejected]: (state, action) => {
      // console.log(action.payload);
      // console.log(action.error.message);
      localStorage.removeItem('token');
      return { state, token: null, isAuthenticated: false, loading: false };
    },

    // logging out a user
    [logout.pending]: (state, action) => {
      return { loading: true };
    },

    [logout.fulfilled]: (state, action) => {
      localStorage.removeItem('token');
      return { state, token: null, isAuthenticated: false, loading: false };
    },

    [logout.rejected]: (state, action) => {
      localStorage.removeItem('token');
      return { state, token: null, isAuthenticated: false, loading: false };
    },
  },
});

export const selectAuth = (state) => state.auth;

// export const { logout } = authSlice.actions;

export default authSlice.reducer;

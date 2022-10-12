import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAlert } from './alertSlice';
import setAuthToken from '../utils/setAuthToken';
// import { clearProfile } from './profileThunk';

// Load User
export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (any, { rejectWithValue }) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');
      // console.log(res);
      return res.data;
    } catch (err) {
      // console.log(err);
      if (err) return rejectWithValue('Opps there seems to be an error');
    }
  }
);

// Register User
export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post('/api/users', body, config);
      //   dispatch(loadUser());
      return res.data;
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
    }
  }
);

// Login User
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post('/api/auth', body, config);
      //   dispatch(loadUser());
      return res.data;
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      return rejectWithValue('Opps there seems to be an error');

      //   console.log(err.msg);
    }
  }
);

// Logout User / Clear the tokens and profile from the state
export const logout = createAsyncThunk('auth/logout', (data, { dispatch }) => {
  try {
    // localStorage.removeItem('token');
    console.log('token removed');
    // dispatch(setAlert('You have been logged out', 'success'));
    // return;
  } catch (err) {
    console.log(err);
  }
});

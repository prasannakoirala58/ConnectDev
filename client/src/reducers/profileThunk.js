import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { setAlert } from './alertSlice';
import setAuthToken from '../utils/setAuthToken';

// Get current users profile
export const getCurrentProfile = createAsyncThunk(
  'profile/getCurrentProfile',
  async (any, { rejectWithValue, dispatch }) => {
    // set token on the headers if there is one
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/profile/me');
      //   console.log(res.data);
      return res.data;
    } catch (err) {
      //   dispatch(setAlert(err.response.statusText, 'danger'));
      rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

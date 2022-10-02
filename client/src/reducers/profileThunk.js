import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { setAlert } from './alertSlice';

// Get current users profile
export const getCurrentProfile = createAsyncThunk(
  'profile/getCurrentProfile',
  async (any, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.get('/api/profile/me');
      return res.data;
    } catch (err) {
      //   dispatch(setAlert(err.response.statusText, 'danger'));
      return rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

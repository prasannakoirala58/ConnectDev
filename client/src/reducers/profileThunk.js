import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAlert } from './alertSlice';
import setAuthToken from '../utils/setAuthToken';

// Get current users profile
export const getCurrentProfile = createAsyncThunk(
  'profile/getCurrentProfile',
  async (any, { rejectWithValue }) => {
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

// Get all profiles
export const getProfiles = createAsyncThunk(
  'profile/getProfiles',
  async (any, { rejectWithValue, dispatch }) => {
    // if (localStorage.token) {
    //   dispatch(clearProfile());
    // }

    try {
      const res = await axios.get('/api/profile');
      return res.data;
    } catch (err) {
      rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

// Get profile by userID
export const getProfileById = createAsyncThunk(
  'profile/getProfileById',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/profile/user/${userId}`);
      return res.data;
    } catch (err) {
      rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

// Get Github repos
export const getGithubRepos = createAsyncThunk(
  'profile/getGithubRepos',
  async (username, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/profile/github/${username}`);
      return res.data;
    } catch (err) {
      rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

// Create or update profile
export const createProfile = createAsyncThunk(
  'profile/createProfile',
  async (formData, { rejectWithValue, dispatch }) => {
    formData = { ...formData };
    console.log(formData);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post('/api/profile', formData, config);
      dispatch(getCurrentProfile());
      dispatch(
        setAlert(formData.edit ? 'Profile Updated' : 'Profile Created', 'success')
      );

      return { edit: formData.edit, res: res.data };
    } catch (err) {
      const errors = err.response.data.errors;
      console.log(errors);

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      return rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

// Add An Experience
export const addExperience = createAsyncThunk(
  'profile/addExperience',
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.put('/api/profile/experience', formData, config);
      //   dispatch(getCurrentProfile());
      dispatch(setAlert('Experience Added', 'success'));

      return res.data;
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      return rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

// Add An Education
export const addEducation = createAsyncThunk(
  'profile/addEducation',
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.put('/api/profile/education', formData, config);
      //   dispatch(getCurrentProfile());
      dispatch(setAlert('Education Added', 'success'));

      return res.data;
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      return rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

// Delete Experience
export const deleteExperience = createAsyncThunk(
  'profile/deleteExperience',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(`/api/profile/experience/${id}`);
      dispatch(setAlert('Experience Removed', 'success'));
      return res.data;
    } catch (err) {
      return rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

// Delete Education
export const deleteEducation = createAsyncThunk(
  'profile/deleteEducation',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(`/api/profile/education/${id}`);
      dispatch(setAlert('Education Removed', 'success'));
      return res.data;
    } catch (err) {
      return rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

// Clear Profile on logout
export const clearProfile = createAsyncThunk('profile/clearProfile', () => {
  try {
    console.log('profile removed');
  } catch (err) {
    console.log(err);
  }
});

/////////////
// Delete Account & Profile
export const accountDeleted = createAsyncThunk(
  'profile/accountDeleted',
  async (id, { rejectWithValue, dispatch }) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      try {
        const res = await axios.delete(`/api/profile`);
        dispatch(clearProfile());
        dispatch(setAlert('Your account has been permanently deleted'));
        return res.data;
      } catch (err) {
        return rejectWithValue({
          msg: err.response.statusText,
          status: err.response.status,
        });
      }
    }
  }
);

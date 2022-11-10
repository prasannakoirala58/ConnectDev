import { createSlice } from '@reduxjs/toolkit';
import {
  getCurrentProfile,
  getProfiles,
  getProfileById,
  getGithubRepos,
  createProfile,
  addExperience,
  addEducation,
  clearProfile,
  deleteExperience,
  deleteEducation,
  accountDeleted,
} from './profileThunk';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: false,
  error: {},
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: {
    // GET current profile
    [getCurrentProfile.pending]: (state) => {
      return { loading: true };
    },

    [getCurrentProfile.fulfilled]: (state, { payload }) => {
      //   console.log(payload);
      return { ...state, profile: payload, loading: false };
    },

    [getCurrentProfile.rejected]: (state, { payload }) => {
      //   console.log(payload);
      return { ...state, error: payload, loading: false };
    },

    // GET all profiles
    [getProfiles.pending]: (state) => {
      return { loading: true };
    },

    [getProfiles.fulfilled]: (state, { payload }) => {
      return { ...state, profiles: payload, loading: false };
    },

    [getProfiles.rejected]: (state, { payload }) => {
      return { ...state, error: payload, loading: false };
    },

    // Get profile by Id
    [getProfileById.pending]: (state) => {
      return { loading: true };
    },

    [getProfileById.fulfilled]: (state, { payload }) => {
      return { ...state, profile: payload, loading: false };
    },

    [getProfileById.rejected]: (state, { payload }) => {
      return { ...state, error: payload, loading: false };
    },

    // Get Github Repos
    [getGithubRepos.pending]: (state) => {
      return { loading: true };
    },

    [getGithubRepos.fulfilled]: (state, { payload }) => {
      return { ...state, repos: payload, loading: false };
    },

    [getGithubRepos.rejected]: (state, { payload }) => {
      return { ...state, error: payload, loading: false };
    },

    // CREATE or UPDATE profile
    [createProfile.pending]: (state) => {
      return { loading: true };
    },

    [createProfile.fulfilled]: (state, { payload }) => {
      return { ...state, profile: payload, loading: false };
    },

    [createProfile.rejected]: (state, { payload }) => {
      //   console.log(payload);
      return { ...state, error: payload, loading: false };
    },

    // ADD experience
    [addExperience.pending]: (state) => {
      return { loading: true };
    },

    [addExperience.fulfilled]: (state, { payload }) => {
      return { ...state, profile: payload, loading: false };
    },

    [addExperience.rejected]: (state, { payload }) => {
      return { ...state, error: payload, loading: false };
    },

    // ADD education
    [addEducation.pending]: (state) => {
      return { loading: true };
    },

    [addEducation.fulfilled]: (state, { payload }) => {
      return { ...state, profile: payload, loading: false };
    },

    [addEducation.rejected]: (state, { payload }) => {
      return { ...state, error: payload, loading: false };
    },

    // Delete experience
    [deleteExperience.pending]: (state) => {
      return { loading: true };
    },

    [deleteExperience.fulfilled]: (state, { payload }) => {
      return { ...state, profile: payload, loading: false };
    },

    [deleteExperience.rejected]: (state, { payload }) => {
      return { ...state, error: payload, loading: false };
    },

    // Delete education
    [deleteEducation.pending]: (state) => {
      return { loading: true };
    },

    [deleteEducation.fulfilled]: (state, { payload }) => {
      return { ...state, profile: payload, loading: false };
    },

    [deleteEducation.rejected]: (state, { payload }) => {
      return { ...state, error: payload, loading: false };
    },

    // clear current profile on logout
    [clearProfile.pending]: (state) => {
      return { ...state };
    },

    [clearProfile.fulfilled]: (state) => {
      return { ...state, profile: null, repos: [], loading: false };
    },

    [clearProfile.rejected]: (state, { payload }) => {
      return { ...state, error: payload, loading: false };
    },

    // Delete account & profile
    [accountDeleted.pending]: (state) => {
      return { ...state };
    },

    [accountDeleted.fulfilled]: (state) => {
      return { ...state, profile: null, repos: [], loading: false };
    },

    [accountDeleted.rejected]: (state, { payload }) => {
      console.log(payload);
      return { ...state, error: payload, loading: false };
    },
  },
});

export const selectProfile = (state) => state.profile;

export default profileSlice.reducer;

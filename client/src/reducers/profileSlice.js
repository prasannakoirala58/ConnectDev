import { createSlice } from '@reduxjs/toolkit';
import { getCurrentProfile } from './profileThunk';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: {
    // get current profile
    [getCurrentProfile.pending]: (state, action) => {
      return { loading: true };
    },

    [getCurrentProfile.fulfilled]: (state, { payload }) => {
      return { state, profile: payload, loading: false };
    },

    [getCurrentProfile.rejected]: (state, { payload }) => {
      console.log(payload);
      return { state, error: payload, loading: false };
    },
  },
});

export const selectProfile = (state) => state.profile;

export default profileSlice.reducer;

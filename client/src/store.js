import { configureStore } from '@reduxjs/toolkit';
// import reducers from the reducers folder
import alertSlice from './reducers/alertSlice';
import authSlice from './reducers/authSlice';
import profileSlice from './reducers/profileSlice';

const store = configureStore({
  reducer: {
    alert: alertSlice,
    auth: authSlice,
    profile: profileSlice,
  },
});

export default store;

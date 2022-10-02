import { createSlice, nanoid } from '@reduxjs/toolkit';

export const alertSlice = createSlice({
  name: 'alert',
  initialState: [],
  reducers: {
    setAlert: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (msg, alertType, timeout = 5000) => {
        const id = nanoid();
        return { payload: { msg, alertType, id } };
      },
    },

    removeAlert: (state, action) => {
      return state.filter((alert) => alert.id !== action.payload);
    },
  },
});

export const selectAlerts = (state) => state.alert;

export const { setAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;

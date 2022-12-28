import { createSlice } from '@reduxjs/toolkit';
import { notInitialized } from 'react-redux/es/utils/useSyncExternalStore';


export const contractSlice = createSlice({
  name: 'contract',
  initialState: {
    instance: notInitialized,
  },
  reducers: {
    setInstance: (state, action) => {
      state.instance = action.payload;
    },
  }
});

export const { setInstance } = contractSlice.actions;

export default contractSlice.reducer;

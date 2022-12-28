import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './accountSlice';
import contractSlice from './contractSlice';


export default configureStore({
  reducer: {
    account: accountReducer,
    contract: contractSlice,
  },
});

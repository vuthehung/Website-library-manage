import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartSlice from './cartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartSlice.reducer,
  },
});

export default store;

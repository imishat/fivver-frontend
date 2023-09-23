import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cart';
import checkOutReducer from './features/cart/checkoutCart/checkoutSlice';
import userSlice from './features/user/userSlice';
export const store = configureStore({
  reducer: {
    cart:cartReducer,
    checkout:checkOutReducer,
    user:userSlice
  },
})
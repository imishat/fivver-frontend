import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cart';
import checkOutReducer from './features/cart/checkoutCart/checkoutSlice';
export const store = configureStore({
  reducer: {
    cart:cartReducer,
    checkout:checkOutReducer
  },
})
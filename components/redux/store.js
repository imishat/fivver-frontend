import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cart';
import checkOutReducer from './features/cart/checkoutCart/checkoutSlice';
import allMessagesSlice from './features/message/allMessagesSlice';
import messageSlice from './features/message/messageSlice';
import updateSlice from './features/update/updateSlice';
import userSlice from './features/user/userSlice';
export const store = configureStore({
  reducer: {
    cart:cartReducer,
    checkout:checkOutReducer,
    user:userSlice,
    message: messageSlice,
    messages: allMessagesSlice,
    update:updateSlice
  },
})
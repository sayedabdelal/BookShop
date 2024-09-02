import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
 
import authReducer from "./auth";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export default store;

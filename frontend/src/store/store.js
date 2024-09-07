import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import userReducer from './userSlice';
import themeReducer from './themeSlice';

import authReducer from "./auth";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer,
    theme: themeReducer,
  },
});

export default store;

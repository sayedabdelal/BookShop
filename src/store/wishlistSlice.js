import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  }
});

export const { addItem, removeItem } = wishlistSlice.actions;
export default wishlistSlice.reducer;

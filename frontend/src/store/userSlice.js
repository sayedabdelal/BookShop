import { createSlice } from '@reduxjs/toolkit';

// Get user_id from localStorage if available
const initialUserId = localStorage.getItem('user_id') || null;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user_id: initialUserId, // Set initial state from localStorage
  },
  reducers: {
    setUserId: (state, action) => {
      // console.log('action.payload:', action.payload);
      state.user_id = action.payload;
      // Store user_id in localStorage
      localStorage.setItem('user_id', action.payload);
    },
    clearUserId: (state) => {
      state.user_id = null;
      // Remove user_id from localStorage
      localStorage.removeItem('user_id');
    },
  },
});

export const { setUserId, clearUserId } = userSlice.actions;
export default userSlice.reducer;

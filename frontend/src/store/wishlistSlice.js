import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch wishlist from backend
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const userId = localStorage.getItem('user_id');  // Get user ID from localStorage
      
      if (!userId) {
        return rejectWithValue('User ID not found');
      }

      
      const response = await fetch(`http://127.0.0.1:5000/wishlist?user_id=${userId}`);

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error || 'Something went wrong');
      }
      console.log('responselog:', response);

      const data = await response.json();
      console.log('datacccccc:', data);
      return data;  // Assuming the response contains { wishlist: [...] }
    } catch (error) {
      return rejectWithValue('Something went wrong');
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addItem: (state, action) => {
      // console.log('action.payload:', action.payload);
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.book_id !== action.payload);
    },
    clearWishList: (state) => {
      state.items = [];
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch wishlist';
      });
  }
});

export const { addItem, removeItem, clearWishList } = wishlistSlice.actions;
export default wishlistSlice.reducer;

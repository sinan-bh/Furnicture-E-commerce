import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async (userID) => {
  const response = await axios.get(`http://localhost:3000/users/wishlist/${userID}`, {
    withCredentials: true,
  });  
  return response.data;
});

export const addWishList = createAsyncThunk('wishlist/addWishList', async ({ userID, productID }) => {
  const response = await axios.post(`http://localhost:3000/users/wishlist/${userID}`, { id: productID }, {
    withCredentials: true,
  });
  return response.data;
});

export const removeFromWishList = createAsyncThunk('wishlist/removeFromWishList', async ({ userID, productID }) => {
  await axios.delete(`http://localhost:3000/users/wishlist/${userID}/${productID}`, {
    withCredentials: true,
  });
  return productID; 
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearWishlist: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data; 
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(addWishList.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFromWishList.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload); 
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;

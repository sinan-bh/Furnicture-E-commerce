import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../../utils/axios';

export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async (userID) => {
  const response = await axiosPrivate.get(`/users/wishlist/${userID}`);  
  return response.data;
});

export const addWishList = createAsyncThunk('wishlist/addWishList', async ({ userID, productID }) => {
  const response = await axiosPrivate.post(`/users/wishlist/${userID}`, { id: productID });
  return response.data;
});

export const removeFromWishList = createAsyncThunk('wishlist/removeFromWishList', async ({ userID, productID }) => {
  await axiosPrivate.delete(`/users/wishlist/${userID}/${productID}`);
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

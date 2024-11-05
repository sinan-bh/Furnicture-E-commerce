import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartProducts = createAsyncThunk(
  "cart/fetchCartProducts",
  async (userID) => {
    const response = await axios.get(
      `http://localhost:3000/users/cart/${userID}`,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userID, productID }) => {
    const response = await axios.post(
      `http://localhost:3000/users/cart/${userID}`,
      { id: productID },
      { withCredentials: true }
    );
    return response.data;
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ userID, prodid, quantityChange }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/users/cart/${userID}`,
        { prodid, quantityChange },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userID, productID }) => {
    const response = await axios.delete(
      `http://localhost:3000/users/cart/${userID}/${productID}`,
      { withCredentials: true }
    );
    return response.status === 200;
  }
);

export const fetchOrderProducts = createAsyncThunk(
  "cart/fetchOrderProducts",
  async (userID) => {
    const response = await axios.get(
      `http://localhost:3000/users/order/${userID}`,
      { withCredentials: true }
    );
    return response.data;
  }
);

const initialState = {
  cart: [],
  order: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCartProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cart.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.cart[index] = action.payload;
        }
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = state.cart.filter(
          (item) => item.id !== action.meta.arg.productID
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrderProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order
      })
      .addCase(fetchOrderProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default cartSlice.reducer;

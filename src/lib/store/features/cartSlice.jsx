import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartProducts = createAsyncThunk(
  "cart/fetchCartProducts",
  async (userID) => {
    const response = await axios.get(`http://localhost:3000/users/cart/${userID}`, { withCredentials: true });
    return response.data;
  }
);

export const addToCart = createAsyncThunk("cart/addToCart", async ({ userID, productID }) => {
  const response = await axios.post(
    `http://localhost:3000/users/cart/${userID}`,
    { id: productID },
    { withCredentials: true }
  );
  return response.data;
});

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
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({ userID, productID }) => {
  const response = await axios.delete(
    `http://localhost:3000/users/cart/${userID}/${productID}`,
    { withCredentials: true }
  );
  return response.status === 200;
});

const initialState = {
  cart: [],
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart.push(action.payload);
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item.id !== action.meta.arg.productID);
      });
  },
});

export default cartSlice.reducer;

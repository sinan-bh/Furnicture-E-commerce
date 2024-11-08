import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../../utils/axios";

export const fetchCartProducts = createAsyncThunk(
  "cart/fetchCartProducts",
  async (userID) => {
    const response = await axiosPrivate.get(`/users/cart/${userID}`);
    return response.data;
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userID, productID }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(`/users/cart/${userID}`, {
        id: productID,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ userID, prodid, quantityChange }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.put(`/users/cart/${userID}`, {
        prodid,
        quantityChange,
      });
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
    const response = await axiosPrivate.delete(
      `/users/cart/${userID}/${productID}`
    );
    return response.status === 200;
  }
);

export const fetchOrderProducts = createAsyncThunk(
  "cart/fetchOrderProducts",
  async (userID) => {
    const response = await axiosPrivate.get(`/users/order/${userID}`);
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
        const item = state.cart.find((item) => item._id === action.payload.id);

        if (item) {
          item.quantity = action.payload.quantity;
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
        console.log(action.meta.arg.productID);

        state.cart = state.cart.filter(
          (item) => item._id !== action.meta.arg.productID
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
        state.order = action.payload.order;
      })
      .addCase(fetchOrderProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;

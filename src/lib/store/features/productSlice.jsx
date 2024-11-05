import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get("http://localhost:3000/users/products", {
    withCredentials: true,
  });
  return response.data;
});

export const fetchProductsByCategory = createAsyncThunk("products/fetchProductsByCategory", async (category) => {
  const response = await axios.get(`http://localhost:3000/users/products?category=${category}`, {
    withCredentials: true,
  });
  return response.data;
});

export const fetchProductsById = createAsyncThunk("products/fetchProductsById", async (productID) => {
  const response = await axios.get(`http://localhost:3000/users/products/${productID}`, {
    withCredentials: true,
  });
  return response.data;
});

export const fetchpPopularProducts = createAsyncThunk("products/fetchPopularProducts", async () => {
  const response = await axios.get(`http://localhost:3000/users/popularproducts`,{
    withCredentials: true
  });
  return response.data
})



const initialState = {
  products: [],
  product: {},
  popular: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchProductsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchpPopularProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchpPopularProducts.fulfilled, (state, action) => {
        state.loading = false
        state.popular = action.payload;
      })
      .addCase(fetchpPopularProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default productSlice.reducer;

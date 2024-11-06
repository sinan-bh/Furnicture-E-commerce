import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    const response = await axios.get(`http://localhost:3000/admin/allusers`, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const fetchUser = createAsyncThunk("users/fetchUser", async (userId) => {
  const response = await axios.get(
    `http://localhost:3000/admin/user/${userId}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(`http://localhost:3000/admin/products`, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const addOrEditProduct = createAsyncThunk(
  "admin/addOrEditProduct",
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      const response = await fetch(
        id
          ? `http://localhost:3000/admin/products/${id}`
          : "http://localhost:3000/admin/products",
        {
          method: id ? "PUT" : "POST",
          body: formDataToSend,
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add/edit product");
      }
      return { formData, id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/admin/products/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await axios.get(`http://localhost:3000/admin/orders`, {
    withCredentials: true,
  });
  return response.data.data;
});

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status }) => {
    const response = await axios.put(
      `http://localhost:3000/admin/order`,
      { order_id: orderId, status },
      { withCredentials: true }
    );
    return response.data;
  }
);

export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchOrderDetails",
  async () => {
    const response = await axios.get(
      `http://localhost:3000/admin/orders/details`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    user: {},
    products: [],
    orders: [],
    orderDetails: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { order_id, status } = action.payload.data;
        const order = state.orders.find((order) =>
          console.log(order._id === order_id)
        );
        if (order) {
          order.status = status;
        }
      })
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("user/login", async (credentials) => {
  const response = await axios.post(
    "http://localhost:3000/login",
    credentials,
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );
  if (response.ok) {
    
  }
  return response.data;
});

// Async thunk for registration
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData) => {
    const response = await axios.post(
      "http://localhost:3000/users/registration",
      userData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  }
);

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (userID) => {
    const response = await axios.get(
      `http://localhost:3000/users/profile/${userID}`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async ({ userID, userData }) => {
    const response = await axios.put(
      `http://localhost:3000/users/profile/${userID}`,
      userData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  }
);

const initialState = {
  userData: {},
  alert: null,
  isEditing: {
    name: false,
    userName: false,
    phone: false,
    email: false,
    address: false,
  },
  isAnyFieldEditing: false,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearAlert: (state) => {
      state.alert = null;
    },
    startEditingField: (state, action) => {
      state.isEditing[action.payload] = true;
      state.isAnyFieldEditing = true;
    },
    stopEditingField: (state, action) => {
      state.isEditing[action.payload] = false;
      state.isAnyFieldEditing = Object.values(state.isEditing).some(
        (isEditing) => isEditing
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload.user; 
        state.alert = { type: "success", message: "Login successful" };
      })
      .addCase(loginUser.rejected, (state) => {
        state.alert = { type: "error", message: "Login failed" };
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.alert = { type: "success", message: "Registration Complete" };
      })
      .addCase(registerUser.rejected, (state) => {
        state.alert = { type: "error", message: "Registration failed" };
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isEditing = {
          name: false,
          userName: false,
          phone: false,
          email: false,
          address: false,
        };
        state.isAnyFieldEditing = false;
      });
  },
});

export const { startEditingField, stopEditingField, clearAlert } = userSlice.actions;
export default userSlice.reducer;

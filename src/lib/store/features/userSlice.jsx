import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../../utils/axios";
import axios from "../../../utils/axios";

export const loginUser = createAsyncThunk("user/login", async (credentials) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/login",
      credentials,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data; 
  } catch (error) {
    throw new Error("Login failed");
  }
});

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
    const response = await axiosPrivate.get(
      `/users/profile/${userID}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  }
);

export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async ({ userID, userData }) => {
    const response = await axiosPrivate.put(
      `/users/profile/${userID}`,
      userData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  }
);

const initialState = {
  userData: {},
  alert: null,
  searchTerm: "",
  isEditing: {
    name: false,
    userName: false,
    phone: false,
    email: false,
    address: false,
  },
  isAnyFieldEditing: false,
  loading: false, 
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {      
      state.searchTerm = action.payload;
    },
    clearAlert: (state) => {
      state.alert = null;
    },
    setUserData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
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

export const { setSearchTerm, setUserData, startEditingField, stopEditingField, clearAlert } = userSlice.actions;
export default userSlice.reducer;

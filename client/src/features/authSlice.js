import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { backendURL } from "../secret";

const baseUrl = backendURL;

// handle google login
export const handleGoogleLogin = createAsyncThunk(
  "auth/handleGoogleLogin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/auth/google-login`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch all users
export const handleLogin = createAsyncThunk(
  "auth/handleLogin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/api/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Ensure cookies are sent
      });
      return response.data.payload.users;
    } catch (error) {
      console.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const handleRegister = createAsyncThunk(
  "auth/handleRegister",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      const response = await axios.post(
        `${baseUrl}/api/users/process-register`,
        formData,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// handle logout
export const handleLogout = createAsyncThunk("auth/handleLogout", async () => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/auth/logout`,
      {},
      {
        withCredentials: true, // Ensure cookies are sent
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

// handle updateUser profile
export const handleUpdate = createAsyncThunk(
  "auth/handleUpdate",
  async ({ newData, id }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseUrl}/api/users/${id}`, newData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data.payload.updatedUser;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// handle updateUser profile
export const handleUpdatePass = createAsyncThunk(
  "auth/handleUpdatePass",
  async (newData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/users/update-password/`,
        newData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: [],
    token: null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    // Handle login
    builder.addCase(handleLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authUser = action.payload;

      // Save user state to localStorage
      action.payload &&
        localStorage.setItem(
          "user",
          JSON.stringify({
            isUser: action.payload && true,
            admin: action.payload?.isAdmin,
            banned: action.payload?.isBanned,
            userName: action.payload?.name,
            img: action.payload?.image,
            email: action.payload?.email,
            address: action.payload?.address,
            phone: action.payload?.phone,
            id: action.payload?._id,
          })
        );
      state.error = null;
    });
    builder.addCase(handleLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.authUser = [];
      state.error = action.payload;
    });
    //handle logout
    builder.addCase(handleLogout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authUser = null;
      localStorage.setItem(
        "user",
        JSON.stringify({
          isUser: false,
        })
      );
      state.error = null;
    });

    //handle update
    builder.addCase(handleUpdate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authUser = action.payload;
      localStorage.setItem(
        "user",
        JSON.stringify({
          isUser: true,
          admin: action.payload.isAdmin,
          banned: action.payload.isBanned,
          userName: action.payload.name,
          img: action.payload.image,
          email: action.payload.email,
          address: action.payload.address,
          phone: action.payload.phone,
          id: action.payload._id,
        })
      );
      state.error = null;
    });
    builder.addCase(handleUpdate.rejected, (state, action) => {
      state.isLoading = false;
      state.authUser = [];
      state.error = action.error.message;
    });
    //handle updatePassword
    builder.addCase(handleUpdatePass.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(handleUpdatePass.rejected, (state, action) => {
      state.isLoading = false;
      state.authUser = [];
      state.error = action.error.message;
    });

    //handle Register
    builder.addCase(handleRegister.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder
      .addCase(handleRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.authUser = [];
        state.error = action.error.message;
      })

      .addCase(handleGoogleLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleGoogleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(handleGoogleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;

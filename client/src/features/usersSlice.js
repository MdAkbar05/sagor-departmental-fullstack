import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { backendURL } from "../secret";
const baseUrl = backendURL;

// Fetch all users
export const getUsers = createAsyncThunk("users/getUsers", async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/users`, {
      withCredentials: true,
    });
    return response.data.payload.users;
  } catch (error) {
    console.error(error);
  }
});

// Fetch all users
export const getUser = createAsyncThunk("users/getUser", async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/api/users/${id}`, {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data.payload.user;
  } catch (error) {
    console.error(error);
  }
});

// Ban a user
export const banUser = createAsyncThunk(
  "users/banUser",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/users/ban-user`,
        { email },
        { withCredentials: true }
      );

      return response.data.payload; // Assuming the payload contains the updated user
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Unban a user
export const unBanUser = createAsyncThunk(
  "users/unBanUser",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/users/unban-user`,
        { email },
        { withCredentials: true }
      );

      return response.data.payload; // Assuming the payload contains the updated user
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete User Thunk
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseUrl}/api/users/${id}`, {
        withCredentials: true,
      });

      return response.data; // Assuming the payload contains the deleted user
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    // Handle getUsers
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      state.error = null;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.users = [];
      state.error = action.error.message;
    });

    // Handle single getUser
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.user = [];
      state.error = action.error.message;
    });

    // Handle banUser
    builder.addCase(banUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(banUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = state.users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
      state.error = null;
    });
    builder.addCase(banUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // Handle unBanUser
    builder.addCase(unBanUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(unBanUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = state.users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
      state.error = null;
    });
    builder.addCase(unBanUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // Handle deleteUser
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
  },
});

export default usersSlice.reducer;

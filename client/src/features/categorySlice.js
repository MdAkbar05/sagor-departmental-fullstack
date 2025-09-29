import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendURL } from "../secret";
const baseUrl = backendURL;
// Async thunk to fetch categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get(`${baseUrl}/api/categories`);
    return response.data.payload.categories;
  }
);

// Async thunk to create a category
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (name) => {
    const response = await axios.post(
      `${baseUrl}/api/categories`,
      {
        name: name,
      },
      { withCredentials: true }
    );
    console.log(response);
    return response.data.payload.newCategory;
  }
);

// Async thunk to update a category
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ name, slug }) => {
    const response = await axios.put(`${baseUrl}/api/categories/${slug}`, {
      name,
    });
    return response.data.payload.updatedCategory;
  }
);

// Async thunk to delete a category
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (slug) => {
    await axios.delete(`http://localhost:3000/api/categories/${slug}`);
    return slug;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetching category
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // creating a category
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      // updating a category
      .addCase(updateCategory.fulfilled, (state, action) => {
        const updatedCategory = action.payload;
        const index = state.categories.findIndex(
          (cat) => cat.slug === updatedCategory.slug
        );
        if (index !== -1) {
          state.categories[index] = updatedCategory;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (cat) => cat.slug !== action.payload
        );
      });
  },
});

export default categorySlice.reducer;

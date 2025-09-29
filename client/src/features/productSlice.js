import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FormData from "form-data";
import { backendURL } from "../secret";
const baseUrl = backendURL;

// Fetch all products
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/api/products`);
      return response.data.payload.product;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch a single product by slug
export const getProductBySlug = createAsyncThunk(
  "products/getProductBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/api/products/${slug}`);
      console.log(response.data);
      return response.data.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch  products by category
export const getProductsByCategory = createAsyncThunk(
  "products/getProductsByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/products/category?category=${category}`
      );
      console.log(response.data);
      return response.data?.payload?.products;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Create a new product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    console.log(productData);
    try {
      const formData = new FormData();
      Object.keys(productData).forEach((key) =>
        formData.append(key, productData[key])
      );

      const response = await axios.post(`${baseUrl}/api/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.payload.product;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a new product
export const addReview = createAsyncThunk(
  "products/addReview",
  async ({ review, id }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/products/${id}/reviews`,
        review,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(response.data?.product);
      return response.data?.product;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response);
    }
  }
);

// Update a product by slug
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ formData, slug }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/products/${slug}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        { withCredentials: true }
      );
      console.log(response);

      return response.data.payload.updatedProduct;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a product by slug
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (slug, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseUrl}/api/products/${slug}`);
      return slug; // Return the slug to remove the product from the UI
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Search a product by query
export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (query, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/products/search?query=${query}`
      );
      return res.data.payload; // Assuming `products` is an array of results
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filteredProducts: [],
    selectedCategories: [], // Array to store selected categories
    currentProduct: null,
    searchResults: [],
    isLoading: false,
    error: null,
  },

  reducers: {
    toggleCategoryFilter: (state, action) => {
      const categorySlug = action.payload;

      if (state.selectedCategories.includes(categorySlug)) {
        // Remove category if already selected
        state.selectedCategories = state.selectedCategories.filter(
          (category) => category !== categorySlug
        );
      } else {
        // Add category if not selected
        state.selectedCategories.push(categorySlug);
      }

      // Apply filter based on selected categories
      if (state.selectedCategories.length > 0) {
        state.filteredProducts = state.products?.filter((product) =>
          state.selectedCategories.includes(product.category.slug)
        );
      } else {
        // If no category selected, show all products
        state.filteredProducts = state.products;
      }
    },
  },

  extraReducers: (builder) => {
    // Handling getProducts
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.products = action.payload;
      state.filteredProducts = action.payload;
      state.error = null;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.products = [];
      state.error = action.payload;
    });

    // Handling getProductBySlug
    builder.addCase(getProductBySlug.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductBySlug.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentProduct = action.payload;
      state.error = null;
    });
    builder.addCase(getProductBySlug.rejected, (state, action) => {
      state.isLoading = false;
      state.currentProduct = null;
      state.error = action.payload;
    });

    // Handling getProductByCategory
    builder.addCase(getProductsByCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductsByCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.filteredProducts = action.payload;
      state.error = null;
    });
    builder.addCase(getProductsByCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.filteredProducts = null;
      state.error = action.payload.message;
    });

    // Handling addProduct
    builder.addCase(addProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products.push(action.payload);
      state.error = null;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.message;
    });

    // Handling addReview
    builder.addCase(addReview.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addReview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentProduct = action.payload;
      state.error = null;
    });
    builder.addCase(addReview.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.data?.message;
    });

    // Handling updateProduct
    builder.addCase(updateProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.products.findIndex(
        (product) => product.slug === action.payload.slug
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      state.error = null;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.message;
    });

    // Handling deleteProduct
    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = state.products.filter(
        (product) => product.slug !== action.payload
      );
      state.error = null;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Handling searchProducts
    builder.addCase(searchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.searchResults = action.payload;
      // Update the state with the search results
      state.error = null;
    });
    builder.addCase(searchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { toggleCategoryFilter } = productsSlice.actions;
export default productsSlice.reducer;

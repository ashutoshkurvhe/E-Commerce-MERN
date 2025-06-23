import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

//Always fetch fresh token
const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  },
});

// Fetch admin products
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/admin/products`,
        getAuthHeader()
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch admin products"
      );
    }
  }
);

// Create product
export const createProduct = createAsyncThunk(
  "adminProducts/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/products`,
        productData,
        getAuthHeader()
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create product"
      );
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/admin/products/${id}`,
        productData,
        getAuthHeader()
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update product"
      );
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/api/admin/products/${id}`,
        getAuthHeader()
      );
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      // Update
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload);
      });
  },
});

export default adminProductSlice.reducer;

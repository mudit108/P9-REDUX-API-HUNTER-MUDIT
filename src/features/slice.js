import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch products with search and pagination
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page = 1, limit = 5, searchTerm = "" }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products?title=${searchTerm}&_page=${page}&_limit=${limit}`
      );
      const total = parseInt(response.headers["x-total-count"] || "100");
      return {
        products: response.data,
        total,
      };
    } catch (error) {
      return rejectWithValue(
        "Failed to fetch products. Please try again later."
      );
    }
  }
);

// Fetch product by ID
export const fetchProductsById = createAsyncThunk(
  "products/fetchProductsById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        "Failed to fetch product details. Please try again later."
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    currentPage: 1,
    totalProducts: 0,
    productsPerPage: 5,
    filters: {
      title: "",
    },
    currentProduct: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.filters.title = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearFilters: (state) => {
      state.filters.title = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.products;
        state.totalProducts = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchProductsById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductsById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setSearchTerm, setCurrentPage, clearFilters } =
  productSlice.actions;
export default productSlice.reducer;

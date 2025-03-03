import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";
import { FetchProductsParams, Product } from "../../types/ProductTypes";

export const fetchProductById = createAsyncThunk(
  "userproducts/fetchProductById",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`products/${productId}`);
      console.log("User Fetch Product By ID: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(
          error.message || `Failed to fetch product with ID: ${productId}`
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const searchProduct = createAsyncThunk(
  "userproducts/searchProduct",
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get(`products/search`, {
        params: {
          query,
        },
      });
      console.log("User Search Product: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(
          error.message || `Failed to search product with query: ${query}`
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchAllProducts = createAsyncThunk<
  Product[],
  FetchProductsParams
>("userproducts/fetchAllProducts", async (params, { rejectWithValue }) => {
  try {
    const response = await api.get("/products", {
      params: {
        ...params,
        pageNumber: params.pageNumber || 0,
      },
    });
    console.log("User Fetch All Products: ", response.data.content);
    return response.data.content;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(
        error.message || `Failed User Search All ${JSON.stringify(params)} `
      );
    }
    return rejectWithValue("An unknown error occurred");
  }
});

interface UserProductState {
  product: Product | null;
  products: Product[];
  totalPages: number;
  loading: boolean;
  error: string | null;
  searchProduct: Product[];
}

const initialState: UserProductState = {
  product: null,
  products: [],
  totalPages: 1,
  loading: false,
  error: null,
  searchProduct: [],
};

const userProductSlice = createSlice({
  name: "userproducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.searchProduct = action.payload;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userProductSlice.reducer;

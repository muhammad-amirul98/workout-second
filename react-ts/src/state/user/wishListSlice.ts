import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WishList } from "../../types/WishListTypes";
import { api } from "../../config/api";
import axios from "axios";

export const getWishList = createAsyncThunk(
  "/wishlist/getWishList",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Get Wish List: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || "Failed to get wishlist"
        );
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const addProductToWishList = createAsyncThunk<
  WishList,
  { jwt: string; productId: number }
>(
  "/wishlist/addProductToWishList",
  async ({ jwt, productId }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/wishlist/${productId}`, null, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("Add product to wish list: ", response.data);

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || "Failed to add product to wish list"
        );
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const deleteProductFromWishList = createAsyncThunk<
  WishList,
  { jwt: string; productId: number }
>(
  "/wishlist/deleteProductFromWishList",
  async ({ jwt, productId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/wishlist/${productId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("Delete product from wish list: ", response.data);

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || "Failed to add product to wish list"
        );
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export interface WishListState {
  wishlist: WishList | null;
  loading: boolean;
  error: unknown;
}

const initialState: WishListState = {
  wishlist: null,
  loading: false,
  error: null,
};

const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    resetWishListState: (state) => {
      state.wishlist = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(getWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(addProductToWishList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductToWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(addProductToWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteProductFromWishList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductFromWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(deleteProductFromWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetWishListState } = wishListSlice.actions;

export default wishListSlice.reducer;

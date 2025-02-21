import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const fetchProducts = createAsyncThunk(
  "/admin/fetchProducts",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/products", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Admin Fetch Products: ", response);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to fetch products");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

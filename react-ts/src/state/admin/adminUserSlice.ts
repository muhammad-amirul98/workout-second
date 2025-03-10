import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/UserTypes";
import { api } from "../../config/api";
import axios from "axios";

export const fetchAllUsers = createAsyncThunk<User[], string>(
  "/adminuser/fetchAllUsers",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/user`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("Admin Fetch User Orders By Id: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || "Failed to fetch user order history"
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export interface AdminUserState {
  users: User[];
  user: User | null;
  loading: boolean;
  error: unknown;
}

const initialState: AdminUserState = {
  users: [],
  user: null,
  loading: false,
  error: null,
};

const adminUserSlice = createSlice({
  name: "adminuser",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // fetchAllUsers
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminUserSlice.reducer;

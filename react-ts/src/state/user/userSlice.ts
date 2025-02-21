/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const fetchUserProfile = createAsyncThunk(
  "/user/fetchUserProfile",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Fetch User Profile: ", response);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to fetch user data");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

interface userState {
  users: any[];
  selectedUser: any;
  profile: any;
  report: any;
  loading: boolean;
  error: any;
}
const initialState: userState = {
  users: [],
  selectedUser: null,
  profile: null,
  report: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;

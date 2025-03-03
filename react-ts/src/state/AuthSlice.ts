import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../config/api";
import axios from "axios";
import { User } from "../types/UserTypes";

export const sendOtp = createAsyncThunk(
  "/auth/sendOtp",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/otp", { email });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to send OTP");
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const signIn = createAsyncThunk(
  "/auth/signIn",
  async (
    { email, otp }: { email: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/auth/signin", { email, otp });
      const jwt = response.data.jwt;
      localStorage.setItem("jwt", jwt);
      console.log(jwt);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Sign in failed");
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const logOut = createAsyncThunk(
  "/auth/logOut",
  async (navigate: (path: string) => void, { rejectWithValue }) => {
    try {
      localStorage.clear();
      navigate("/"); // First, navigate
      setTimeout(() => {
        window.location.reload(); // Then reload
      }, 100);
      console.log("Logout success");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Sign in failed");
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const signUp = createAsyncThunk(
  "/auth/signUp",
  async (
    { email, otp }: { email: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/auth/signup", { email, otp });
      const jwt = response.data.jwt;
      localStorage.setItem("jwt", jwt);
      window.location.reload();

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Sign up failed");
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "/auth/fetchUserProfile",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to fetch user data");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

interface AuthState {
  jwt: string;
  otpSent: boolean;
  isLoggedIn: boolean;
  loading: boolean;
  user: User | null;
  error: unknown;
}

const initialState: AuthState = {
  loading: false,
  isLoggedIn: false,
  otpSent: false,
  user: null,
  jwt: "",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {}, // No synchronous reducers needed
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.jwt = action.payload.jwt;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.jwt = action.payload.jwt;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Send OTP
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.otpSent = true; // Mark that OTP was sent
        state.loading = false;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Log Out
      .addCase(logOut.fulfilled, (state) => {
        state.jwt = "";
        state.isLoggedIn = false;
        state.user = null;
      })

      //Fetch User Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;

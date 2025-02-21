import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../config/api";
import axios from "axios";

export const sendLoginSignUpOtp = createAsyncThunk(
  "/auth/sendLoginSignUpOtp",
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

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Transaction } from "../../types/OrderTypes";
import axios from "axios";
import { api } from "../../config/api";

export const fetchAllTransactions = createAsyncThunk<
  Transaction[],
  string,
  { rejectValue: string }
>("/transactions/fetchAllTransactions", async (jwt, { rejectWithValue }) => {
  try {
    const response = await api.get<Transaction[]>("/transaction", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    console.log("Admin fetch all transactions: ", response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch transactions"
      );
    }
    return rejectWithValue("An unknown error occurred");
  }
});

export interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: unknown;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAllTransactions
      .addCase(fetchAllTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;

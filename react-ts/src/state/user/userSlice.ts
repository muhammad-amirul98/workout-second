/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../config/api";
import { Address } from "../../types/UserTypes";

export const fetchUserProfile = createAsyncThunk(
  "/user/fetchUserProfile",
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

export const fetchUserAddresses = createAsyncThunk(
  "/user/fetchUserAddresses",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/addresses", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(
          error.message || "Failed to fetch user addresses"
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const createAddress = createAsyncThunk<
  unknown,
  { address: Address; jwt: string }
>("/user/createAddress", async ({ jwt, address }, { rejectWithValue }) => {
  try {
    const response = await api.post("/user/addresses", address, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    console.log("Address Created: ", response.data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message || "Failed to create address");
    }
    return rejectWithValue("An unknown error occurred");
  }
});

export const deleteAddress = createAsyncThunk<
  unknown,
  { addressId: number; jwt: string }
>("/user/deleteAddress", async ({ jwt, addressId }, { rejectWithValue }) => {
  try {
    const response = await api.delete("/user/addresses", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      params: { addressId },
    });

    console.log("Address Deleted: ", response.data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message || "Failed to delete address");
    }
    return rejectWithValue("An unknown error occurred");
  }
});

export const editAddress = createAsyncThunk<
  unknown,
  { addressId: number; jwt: string; newAddress: Address }
>(
  "/user/editAddress",
  async ({ jwt, addressId, newAddress }, { rejectWithValue }) => {
    try {
      const response = await api.put("/user/addresses", newAddress, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: { addressId },
      });

      console.log("Address Edited: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to edit address");
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
  addresses: any[];
}
const initialState: userState = {
  users: [],
  selectedUser: null,
  profile: null,
  report: null,
  loading: false,
  error: null,
  addresses: [],
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
      })

      //  fetchUserAddresses
      .addCase(fetchUserAddresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchUserAddresses.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.addresses = action.payload; // Update the appropriate state for addresses
        }
      )
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle errors as needed
      })
      //createAddress
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAddress.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.addresses = action.payload; // Update the appropriate state for addresses
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle errors as needed
      })

      //editAddress
      .addCase(editAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(editAddress.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.addresses = action.payload; // Update the appropriate state for addresses
      })
      .addCase(editAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle errors as needed
      })

      //deleteAddress
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.addresses = action.payload; // Update the appropriate state for addresses
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle errors as needed
      });
  },
});

export default userSlice.reducer;

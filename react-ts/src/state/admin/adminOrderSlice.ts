import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderItem, OrderStatus } from "../../types/OrderTypes";
import { Order } from "../../types/OrderTypes";
import { api } from "../../config/api";
import axios from "axios";

export const fetchOrderByUserId = createAsyncThunk<
  Order[],
  { jwt: string; userId: number }
>(
  "/adminorder/fetchOrderByUserId",
  async ({ jwt, userId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/order/admin/${userId}`, {
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

export const fetchAllOrders = createAsyncThunk<Order[], string>(
  "/adminorder/fetchAllOrders",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`/order/admin/allOrders`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("Admin Fetch All User Orders: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || "Failed to fetch all user order history"
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchAllOrdersByPage = createAsyncThunk<
  Order[],
  { jwt: string; page: number; size: number; sort?: string }
>(
  "/adminorder/fetchAllOrdersByPage",
  async ({ jwt, page, size, sort = "id,asc" }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/order/admin/allOrdersPage`, {
        headers: { Authorization: `Bearer ${jwt}` },
        params: { page, size, sort },
      });
      console.log("Admin Fetch All User Orders: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || "Failed to fetch all user order history"
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const updateOrderStatus = createAsyncThunk<
  Order,
  { jwt: string; orderId: number; orderStatus: OrderStatus }
>(
  "/adminorder/updateOrderStatus",
  async ({ jwt, orderId, orderStatus }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/order/admin/updateStatus/${orderId}`,
        { orderStatus },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log("Admin Fetch All User Orders: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || "Failed to fetch all user order history"
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export interface AdminOrderState {
  orders: Order[];
  orderItem: OrderItem | null;
  currentOrder: Order | null;
  paymentOrder: unknown;
  loading: boolean;
  error: unknown;
  orderCancelled: boolean;
}

const initialState: AdminOrderState = {
  orders: [],
  orderItem: null,
  currentOrder: null,
  paymentOrder: null,
  loading: false,
  error: null,
  orderCancelled: false,
};

const adminOrderSlice = createSlice({
  name: "adminorder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchUserOrderHistory
      .addCase(fetchOrderByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrderByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      // fetchAllOrders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      // fetchAllOrdersByPage
      .addCase(fetchAllOrdersByPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrdersByPage.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrdersByPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      // updateOrderStatus
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        if (index !== -1) {
          state.orders[index] = action.payload; // Update the existing order
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminOrderSlice.reducer;

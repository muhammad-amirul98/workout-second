import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderItem } from "../../types/OrderTypes";
import { Order } from "../../types/OrderTypes";
import { api } from "../../config/api";

export const fetchUserOrderHistory = createAsyncThunk<Order[], string>(
  "/order/fetchUserOrderHistory",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/order", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Fetch User Order History: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(
          error.message || "Failed to fetch user order history"
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchOrderById = createAsyncThunk<
  Order,
  { orderId: number; jwt: string }
>("/order/fetchOrderById", async ({ jwt, orderId }, { rejectWithValue }) => {
  try {
    const response = await api.get(`/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("Fetch User Order By ID: ", response);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(
        error.message || "Failed to fetch user order by Id"
      );
    }
    return rejectWithValue("An unknown error occurred");
  }
});

interface CreateOrderResponse {
  paymentLinkUrl: string;
}

export const createOrder = createAsyncThunk<
  unknown,
  { addressId: number; jwt: string; paymentGateway: string }
>(
  "/order/createOrder",
  async ({ jwt, addressId, paymentGateway }, { rejectWithValue }) => {
    try {
      const response = await api.post<CreateOrderResponse>(
        "/order",
        {
          paymentMethod: paymentGateway,
          addressId: addressId,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("Order Created: ", response);
      if (response.data.paymentLinkUrl) {
        window.location.href = response.data.paymentLinkUrl;
      }
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to create order");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchOrderItemById = createAsyncThunk<
  OrderItem,
  { orderItemId: number; jwt: string }
>(
  "/order/fetchOrderItemById",
  async ({ orderItemId, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/order/${orderItemId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Fetch Order Item By Id: ", response);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(
          error.message || "Failed To Fetch Order Item By Id"
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const paymentSuccess = createAsyncThunk<
  unknown,
  { paymentId: string; jwt: string; paymentLinkId: string }
>(
  "/order/paymentSuccess",
  async ({ paymentId, jwt, paymentLinkId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/payment/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: {
          paymentLinkId,
        },
      });
      console.log("Payment Success: ", response);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Payment Failure");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const cancelOrder = createAsyncThunk<
  Order,
  { orderId: string; jwt: string }
>("/order/cancelOrder", async ({ orderId, jwt }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/order/${orderId}/cancel`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("Cancel Order: ", response);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message || "Cancel Order Failure");
    }
    return rejectWithValue("An unknown error occurred");
  }
});

export interface OrderState {
  orders: Order[];
  orderItem: OrderItem | null;
  currentOrder: Order | null;
  paymentOrder: unknown;
  loading: boolean;
  error: unknown;
  orderCancelled: boolean;
}

const initialState: OrderState = {
  orders: [],
  orderItem: null,
  currentOrder: null,
  paymentOrder: null,
  loading: false,
  error: null,
  orderCancelled: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchUserOrderHistory
      .addCase(fetchUserOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //fetchOrderById
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //createOrder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //fetchOrderItemById
      .addCase(fetchOrderItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.orderItem = action.payload;
      })
      .addCase(fetchOrderItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // paymentSuccess
      .addCase(paymentSuccess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(paymentSuccess.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Payment successful: ", action.payload);
      })
      .addCase(paymentSuccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // cancelOrder

      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderCancelled = false;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderCancelled = true;
        state.orders = state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        );
        state.currentOrder = action.payload;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;

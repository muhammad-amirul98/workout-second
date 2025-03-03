import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItemType } from "../../types/CartTypes";
import { api } from "../../config/api";
import { sumCartPrice } from "../../user/pages/Util/sumCartPrice";

export const fetchUserCart = createAsyncThunk(
  "usercart/fetchUserCart",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("User Fetch Cart: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || `Failed to fetch cart`);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export interface UpdateItemRequest {
  productId: number;
  quantity: number;
}

export const addItemToCart = createAsyncThunk<
  CartItemType,
  { jwt: string; productId: number }
>("usercart/addItemToCart", async ({ jwt, productId }, { rejectWithValue }) => {
  try {
    const response = await api.put("/cart/add", null, {
      params: { productId },
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("Added Item To Cart Successfully: ", response.data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message || `Failed to add item to cart`);
    }
    return rejectWithValue("An unknown error occurred");
  }
});

export const removeItemFromCart = createAsyncThunk<
  CartItemType,
  { jwt: string; productId: number }
>(
  "usercart/removeItemFromCart",
  async ({ jwt, productId }, { rejectWithValue }) => {
    try {
      const response = await api.delete("/cart/remove", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: { productId },
      });

      console.log("Removed Item From Cart Successfully: ");
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(
          error.message || `Failed to remove item from cart`
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk<
  CartItemType,
  { jwt: string; request: UpdateItemRequest }
>(
  "usercart/updateCartItemQuantity",
  async ({ jwt, request }, { rejectWithValue }) => {
    try {
      const response = await api.put("/cart/update", request, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("Item Updated Successfully: ", response.data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(
          error.message || `Failed to update item from cart`
        );
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: unknown;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

const userCartSlice = createSlice({
  name: "usercart",
  initialState,
  reducers: {
    resetCartState: (state) => {
      state.cart = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Cart
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserCart.fulfilled,
        (state, action: PayloadAction<Cart>) => {
          state.loading = false;
          state.cart = action.payload;
        }
      )
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Item To Cart
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addItemToCart.fulfilled,
        (state, action: PayloadAction<CartItemType>) => {
          state.loading = false;
          state.cart?.cartItems?.push(action.payload);
        }
      )
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove Item From Cart
      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.loading = false;
        const removedProductId = action.meta.arg.productId;

        if (state.cart) {
          state.cart.cartItems = state.cart.cartItems?.filter(
            (item) => item.product.id !== removedProductId
          );

          state.cart.totalPrice = sumCartPrice(state.cart.cartItems || []);
        }
      })

      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update item quantity in cart
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateCartItemQuantity.fulfilled,
        (state, action: PayloadAction<CartItemType>) => {
          state.loading = false;
          if (state.cart?.cartItems) {
            // Find the index of the existing item
            const index = state.cart.cartItems?.findIndex(
              (item) => item.product.id === action.payload.product.id
            );

            if (index > -1) {
              // Update the existing item quantity
              state.cart.cartItems[index] = action.payload;
            }
            state.cart.totalPrice = sumCartPrice(state.cart.cartItems || []);
          }
        }
      )
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userCartSlice.reducer;

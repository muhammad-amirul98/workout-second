import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userSlice from "./user/userSlice";
import productSlice from "./admin/productSlice";
import userProductSlice from "./user/userProductSlice";
import authSlice from "./AuthSlice";
import userCartSlice from "./user/userCartSlice";
import orderSlice from "./user/orderSlice";
import wishListSlice from "./user/wishListSlice";
import adminOrderSlice from "./admin/adminOrderSlice";
import transactionSlice from "./admin/transactionSlice";
import adminUserSlice from "./admin/adminUserSlice";
import userWorkoutSlice from "./user/userWorkoutSlice";

const rootReducer = combineReducers({
  user: userSlice,
  product: productSlice,
  userproduct: userProductSlice,
  auth: authSlice,
  usercart: userCartSlice,
  order: orderSlice,
  wishlist: wishListSlice,
  adminorder: adminOrderSlice,
  transactions: transactionSlice,
  adminuser: adminUserSlice,
  userworkout: userWorkoutSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

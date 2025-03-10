import "./App.css";
import Navbar from "./user/components/Navbar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"; // Import your theme
// import Home from "./user/pages/Home/Home";
import Product from "./user/pages/Product/Product";
import ProductDetail from "./user/pages/ProductDetail/ProductDetail";
import Review from "./user/pages/Review/Review";
import Cart from "./user/pages/Cart/Cart";
import Checkout from "./user/pages/Checkout/Checkout";
import Account from "./user/pages/Account/Account";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./user/pages/Dashboard/Dashboard";
import AdminDashboard from "./admin/pages/AdminDashboard";
import { useEffect, useState } from "react";
import Auth from "./auth/Auth";
import { useAppDispatch, useAppSelector } from "./state/store";
import { fetchUserProfile } from "./state/AuthSlice";
import Workout from "./user/pages/Dashboard/Workout";
import PaymentSuccess from "./user/pages/Payment/PaymentSuccess";
import PaymentCancel from "./user/pages/Payment/PaymentCancel";
import WishList from "./user/pages/WishList/WishList";
import AdminNavbar from "./admin/AdminNavbar";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const jwt = localStorage.getItem("jwt") || auth.jwt;
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (jwt) {
      dispatch(fetchUserProfile(jwt)); // Dispatch the async action
    }
  }, [jwt, dispatch]); // Runs when `jwt` changes

  // Wait for auth.user to be populated
  useEffect(() => {
    if (auth.user?.role) {
      setRole(auth.user.role);
    }
  }, [auth.user]);

  return (
    <ThemeProvider theme={theme}>
      <div>
        {role === "ROLE_ADMIN" && <AdminNavbar />}
        {role === "ROLE_USER" && <Navbar />}
        {/* {!role && <Auth />} */}

        <Routes>
          {/* <Route path="/" element={<Auth />} /> */}
          <Route
            path="/"
            element={
              role === "ROLE_ADMIN" ? (
                <AdminDashboard />
              ) : role === "ROLE_USER" ? (
                <Workout />
              ) : (
                <Auth />
              )
            }
          />
          <Route path="/products" element={<Product />} />

          <Route path="/products/:brand" element={<Product />} />
          <Route
            path="/product-details/:productId"
            element={<ProductDetail />}
          />
          <Route path="/reviews/:productId" element={<Review />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-cancel/:orderId" element={<PaymentCancel />} />
          <Route
            path="/payment-success/:orderId"
            element={<PaymentSuccess />}
          />
          <Route path="/account/*" element={<Account />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          {/* <Route path="/auth" element={<Auth />} /> */}
          <Route path="/workout" element={<Workout />} />
          <Route path="/wishlist" element={<WishList />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

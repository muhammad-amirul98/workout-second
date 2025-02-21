import "./App.css";
import Navbar from "./user/components/Navbar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"; // Import your theme
import Home from "./user/pages/Home/Home";
import Product from "./user/pages/Product/Product";
import ProductDetail from "./user/pages/ProductDetail/ProductDetail";
import Review from "./user/pages/Review/Review";
import Cart from "./user/pages/Cart/Cart";
import Checkout from "./user/pages/Checkout/Checkout";
import Account from "./user/pages/Account/Account";
import { Route, Routes, useNavigate } from "react-router-dom";
// import Workout from "./user/pages/Workout/Workout";
import Dashboard from "./user/pages/Dashboard/Dashboard";
import AdminDashboard from "./admin/Pages/AdminDashboard";
import { useEffect } from "react";
import Login from "./auth/Login";
import { fetchUserProfile } from "./state/user/userSlice";
import { useAppDispatch, useAppSelector } from "./state/store";

function App() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      dispatch(fetchUserProfile(token));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user.profile) {
      navigate("account/profile");
    }
  }, [user.profile]);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route
            path="/product-details/:categoryId/:name/:productId"
            element={<ProductDetail />}
          />
          <Route path="/reviews/:productId" element={<Review />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account/*" element={<Account />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

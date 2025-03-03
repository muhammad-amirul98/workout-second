import { Button } from "@mui/material";
import CartItem from "./CartItem";
import PricingCard from "./PricingCard";
import { useNavigate } from "react-router-dom";
import { fetchUserCart } from "../../../state/user/userCartSlice";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { useEffect } from "react";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const usercart = useAppSelector((state) => state.usercart);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt"); // Get JWT inside the useEffect
    if (jwt) {
      dispatch(fetchUserCart(jwt));
    }
  }, []);

  return (
    <div className="pt-10 px-5 sm:px-10 md:px-60 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* CART ITEM */}
        <div className="lg:col-span-2 space-y-3">
          {usercart.cart?.cartItems?.map((cartItem, index) => (
            <CartItem key={index} cartItem={cartItem} />
          ))}
        </div>

        {/* PRICING CARD */}
        <div className="col-span-1 text-sm space-y-3 border rounded-md p-5 border-gray-300 self-start">
          <PricingCard />
          <div className="items-center">
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/checkout")}
            >
              Buy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

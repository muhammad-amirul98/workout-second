import { Divider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { useEffect } from "react";
import { fetchUserCart } from "../../../state/user/userCartSlice";

const PricingCard = () => {
  const dispatch = useAppDispatch();
  const usercart = useAppSelector((store) => store.usercart);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt"); // Get JWT inside the useEffect
    if (jwt) {
      dispatch(fetchUserCart(jwt));
    }
  }, []);

  const deliverycost = 10;

  return (
    <div className="space-y-3 p-5">
      <div className="flex justify-between items-center">
        <span>Subtotal:</span>
        <span>{usercart.cart?.totalPrice?.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Delivery:</span>
        <span>${deliverycost}</span>
      </div>
      <Divider />
      <div className="mt-3 flex justify-between items-center text-teal-500">
        <span>Total:</span>
        <span>
          ${(deliverycost + (usercart.cart?.totalPrice || 0)).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default PricingCard;

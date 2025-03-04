/* eslint-disable no-constant-condition */
import { Box, Button, Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import OrderStepper from "./OrderStepper";
import { Payments } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { useEffect } from "react";
import { fetchOrderById } from "../../../state/user/orderSlice";
import { fetchUserProfile } from "../../../state/AuthSlice";

const OrderDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { orderId } = useParams();
  const jwt = localStorage.getItem("jwt");
  const order = useAppSelector((store) => store.order);
  const auth = useAppSelector((store) => store.auth);

  useEffect(() => {
    const orderIdNumber = Number(orderId);
    if (jwt) {
      dispatch(fetchOrderById({ orderId: orderIdNumber, jwt }));
      dispatch(fetchUserProfile(jwt));
    }
  }, []);

  return (
    <Box className="space-y-5">
      {/* PRODUCT */}
      <div className="flex flex-col gap-5 justify-center items-center">
        <img
          className="w-[100px]"
          src={order.currentOrder?.orderItems[0].product.images[0]}
          alt=""
        />
        <div className="text-sm space-y-1 text-center">
          <h1 className="font-bold">
            {order.currentOrder?.orderItems[0].product.name}
          </h1>
          <p>{order.currentOrder?.orderItems[0].product.brand}</p>
          <p>
            Quantity:
            {order.currentOrder?.orderItems[0].quantity}{" "}
          </p>
        </div>
        <div>
          <Button onClick={() => navigate(`/reviews/${5}/create`)}>
            Write Review
          </Button>
        </div>
      </div>

      {/* ORDER PROGRESS */}
      <div className="border border-gray-300 p-5 rounded-md">
        <OrderStepper orderStatus={"SHIPPING"} />
      </div>

      {/* ADDRESS */}
      <div className="border p-5 rounded-md border-gray-300">
        <h1 className="font-bold pb-2">Delivery Address: </h1>
        <div className="text-sm space-y-2">
          <div className="flex gap-5 font-semibold">
            <p>{auth.user?.fullName}</p>
            <Divider flexItem orientation="vertical" />
            <p>{auth.user?.mobile}</p>
          </div>
          <div className="flex gap-5 font-medium">
            {/* <p>{auth.user?.fullName}</p> */}
            <p>{order.currentOrder?.shippingAddress.country}</p>
            <Divider flexItem orientation="vertical" />
            <p>{order.currentOrder?.shippingAddress.street}</p>
            <Divider flexItem orientation="vertical" />
            <p>{order.currentOrder?.shippingAddress.zip}</p>
          </div>
        </div>
      </div>
      {/* PAYMENT */}
      <div className="border space-y-4 border-gray-300 rounded-md">
        <div className="flex justify-between text-sm pt-5 px-5">
          <div className="space-y-1">
            <p className="font-bold">Total Price:</p>
          </div>
          <p className="font-medium">{order.currentOrder?.totalPrice}</p>
        </div>
        <div className="px-5">
          <div className="bg-teal-50 px-5 py-2 text-xs font-medium flex items-center gap-3 mb-3 rounded-md  ">
            <Payments />
            <p>Pay On Delivery</p>
          </div>
        </div>
        <Divider />
        <div className="p-10">
          <Button
            disabled={true}
            color="error"
            variant="outlined"
            fullWidth
            sx={{ py: "0.7rem" }}
          >
            {true ? "Order Cancelled" : "Cancel Order"}
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default OrderDetails;

/* eslint-disable no-constant-condition */
import { Box, Button, Divider } from "@mui/material";
import image from "../../../assets/protein1.jpg";
import { useNavigate } from "react-router-dom";
import OrderStepper from "./OrderStepper";
import { Payments } from "@mui/icons-material";

const OrderDetails = () => {
  const navigate = useNavigate();
  return (
    <Box className="space-y-5">
      {/* PRODUCT */}
      <div className="flex flex-col gap-5 justify-center items-center">
        <img className="w-[100px]" src={image} alt="" />
        <div className="text-sm space-y-1 text-center">
          <h1 className="font-bold">Optimum Nutrition</h1>
          <p>Gold Standard 100% Whey </p>
          <p>Quantity: 1 </p>
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
          <div className="flex gap-5 font-medium">
            <p>User</p>
            <Divider flexItem orientation="vertical" />
            <p>123 Elm Street, Springfield, IL 62701, USA</p>
          </div>
          <p>(555) 123-4567</p>
        </div>
      </div>
      {/* PAYMENT */}
      <div className="border space-y-4 border-gray-300 rounded-md">
        <div className="flex justify-between text-sm pt-5 px-5">
          <div className="space-y-1">
            <p className="font-bold">Total Price:</p>
          </div>
          <p className="font-medium">$100</p>
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

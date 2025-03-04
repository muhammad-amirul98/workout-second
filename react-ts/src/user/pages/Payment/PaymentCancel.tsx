import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[90vh] flex justify-center items-center">
      <div className="bg-red-900 text-white p-8 w-[90%] lg:w-[30%] border rounded-md h-[40vh] flex flex-col gap-7 items-center justify-center">
        <h1 className="text-3xl font-semibold">Payment Unsuccessful.</h1>
        {/* <h2 className="text-2xl font-semibold">Order number: {orderId}</h2> */}
        <div>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            color="secondary"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;

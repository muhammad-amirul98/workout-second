import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import Address from "./AddressCard";
import { useState } from "react";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";
import stripeImage from "../../../assets/images.png";
import razorPayImage from "../../../assets/razorpay.webp";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const paymentGateways = [
  {
    value: "RAZORPAY",
    image: razorPayImage,
    label: "",
  },
  {
    value: "STRIPE",
    image: stripeImage,
    label: "",
  },
];

const Checkout = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [paymentGateway, setPaymentGateway] = useState("RAZORPAY");
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentGateway(e.target.value);
  };

  return (
    <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen">
      <div className="space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9">
        <div className="col-span-2 space-y-5">
          <div className="flex font-bold justify-between items-center">
            <h1>Select Address </h1>
          </div>
          <div className="text-xs font-medium space-y-5">
            <p>Saved Addresses: </p>
            <div className="space-y-3">
              {[1, 1, 1].map((_, index) => (
                <Address key={`address${index}`} />
              ))}
            </div>
          </div>
          <div className="py-5 px-5 rounded-md border border-gray-300">
            <Button onClick={handleOpen}>Add New Address</Button>
          </div>
        </div>

        {/* PRICING CARD */}
        <div className="col-span-1 text-sm space-y-3 border rounded-md p-5 border-gray-300 self-start">
          <div className="items-center space-y-3">
            <h1 className="text-center">Choose Payment Gateway:</h1>
            <RadioGroup
              aria-labelledby="payment-method-group-label"
              defaultValue="stripe"
              name="payment-method-group"
              className="flex items-center pr-0"
              onChange={handlePaymentChange}
              value={paymentGateway}
            >
              {paymentGateways.map((item, index) => (
                <FormControlLabel
                  key={`payment${index}`}
                  value={item.value}
                  control={<Radio />}
                  label={<img className="h-10" src={item.image} />}
                />
              ))}
            </RadioGroup>
          </div>
          <PricingCard />
          <div className="items-center">
            <Button variant="contained" fullWidth>
              Checkout
            </Button>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddressForm />
        </Box>
      </Modal>
    </div>
  );
};

export default Checkout;

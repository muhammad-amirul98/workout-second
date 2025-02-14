import { Divider } from "@mui/material";

const PricingCard = () => {
  return (
    <div className="space-y-3 p-5">
      <div className="flex justify-between items-center">
        <span>Subtotal:</span>
        <span>$100</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Delivery:</span>
        <span>$10</span>
      </div>
      <Divider />
      <div className="mt-3 flex justify-between items-center text-teal-500">
        <span>Total:</span>
        <span>$110</span>
      </div>
    </div>
  );
};

export default PricingCard;

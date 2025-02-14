import { Button, Divider } from "@mui/material";
import image1 from "../../../assets/gym2.avif";
import { Add, Close, Remove } from "@mui/icons-material";
import { useState } from "react";

const CartItem = () => {
  const [quantity, setQuantity] = useState(0);

  const add = () => {
    setQuantity(quantity + 1);
  };

  const minus = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="border rounded-md relative border-gray-300">
      <div className="p-5 flex gap-3">
        <div>
          <img src={image1} className="w-[90px] rounded-md" />
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold text-lg">Optimum Nutrition</h1>
          <p className="text-gray-500 font-semibold">
            GOLD STANDARD 100% WHEY™
          </p>
          <p className="text-gray-500">Quantity: {quantity}</p>
        </div>
        <div className=" absolute top-1 right-1">
          <Button>
            <Close />
          </Button>
        </div>
      </div>

      <Divider />
      <div className="px-5 py-2 flex justify-between items-center">
        {/* QUANTITY ADD REMOVE */}
        <div className="flex items-center gap-2 w-[140px] justify-between">
          <Button onClick={minus}>
            <Remove />
          </Button>
          <span>{quantity}</span>
          <Button onClick={add}>
            <Add />
          </Button>
        </div>
        <div>
          <p>$900</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

import { ElectricBolt } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { teal } from "@mui/material/colors";
import { Order } from "../../../types/OrderTypes";
import { dateFormat } from "../Util/dateFormat";
import { useNavigate } from "react-router-dom";

const OrderItem = ({ item }: { item: Order }) => {
  const navigate = useNavigate();
  return (
    <div
      className="text-sm bg-white p-5 space-y-4 border rounded-md border-gray-300 cursor-pointer"
      onClick={() => navigate(`${item.id}`)}
    >
      <div className="flex items-center gap-5">
        <Avatar sizes="small" sx={{ bgcolor: teal[600] }}>
          <ElectricBolt />
        </Avatar>
        <div>
          <h1 className="text-teal-600 font-semibold">{item.orderStatus}</h1>
          <p>Arriving: {dateFormat(item.deliverDate)}</p>
        </div>
      </div>
      <div className="p-5 bg-teal-50 flex gap-3">
        <div>
          <img
            src={item.orderItems[0].product.images[0]}
            alt=""
            className="w-[70px]"
          />
        </div>
        <div className=" flex flex-col w-full space-y-2 justify-center">
          <h1 className="font-bold">Name: {item.orderItems[0].product.name}</h1>
          <p>Brand: {item.orderItems[0].product.brand}</p>
          <p>Quantity: {item.orderItems[0].quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;

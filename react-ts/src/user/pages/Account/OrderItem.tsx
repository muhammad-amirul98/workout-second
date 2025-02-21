import { ElectricBolt } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { teal } from "@mui/material/colors";
import image from "../../../assets/protein1.jpg";

const OrderItem = () => {
  return (
    <div className="text-sm bg-white p-5 space-y-4 border rounded-md border-gray-300 cursor-pointer">
      <div className="flex items-center gap-5">
        <Avatar sizes="small" sx={{ bgcolor: teal[600] }}>
          <ElectricBolt />
        </Avatar>
        <div>
          <h1 className="text-teal-600 font-semibold">PENDING</h1>
          <p>Arriving: Fri, 4th Oct</p>
        </div>
      </div>
      <div className="p-5 bg-teal-50 flex gap-3">
        <div>
          <img src={image} alt="" className="w-[70px]" />
        </div>
        <div className=" flex flex-col w-full space-y-2 justify-center">
          <h1 className="font-bold">Optimum Nutrition</h1>
          <p>Gold Standard 100% Whey</p>
          <p>Quantity: 1</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;

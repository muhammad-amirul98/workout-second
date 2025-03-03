import { Divider } from "@mui/material";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Orders from "./Orders";
import OrderDetails from "./OrderDetails";
import Profile from "./Profile";
import Address from "./Address";

const menu = [
  { name: "Orders", path: "/account/orders" },
  { name: "Workouts", path: "/account/workouts" },
  { name: "Profile", path: "/account/profile" },
  { name: "Saved Cards", path: "/account/saved-cards" },
  { name: "Addresses", path: "/account/addresses" },
];

const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="px-5 lg:px-52 min-h-screen mt-10">
      <div className="">
        <h1 className="text-xl font-bold pb-5">Account</h1>
      </div>
      <Divider />

      {/* LEFT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:min-h-[78vh]">
        <div className="col-span-1 lg:border-r lg:pr-5 py-5 h-full border-gray-300">
          {menu.map((item) => (
            <div
              key={item.name}
              className={`${
                item.path === location.pathname ? "bg-teal-700 text-white" : ""
              } py-3 cursor-pointer hover:text-white hover:bg-teal-700 rounded-md px-5 border-b border-gray-300`}
            >
              <p key={item.path} onClick={() => navigate(item.path)}>
                {item.name}
              </p>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="right lg:col-span-2 lg:pl-5 py-5">
          <Routes>
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:orderId" element={<OrderDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addresses" element={<Address />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Account;

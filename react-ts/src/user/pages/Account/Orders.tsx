import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchUserOrderHistory } from "../../../state/user/orderSlice";
import OrderItem from "./OrderItem";

const Orders = () => {
  const dispatch = useAppDispatch();
  const order = useAppSelector((store) => store.order);

  useEffect(() => {
    dispatch(fetchUserOrderHistory(localStorage.getItem("jwt") || ""));
    console.log(order.orders);
  }, []);

  return (
    <div className="text-sm min-h-screen">
      <div className="pb-5">
        <h1 className="font-semibold">All Orders</h1>
        {/* <p>From Anytime</p> */}
      </div>
      <div className="space-y-2">
        {order.orders.map((item, index) => (
          <OrderItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Orders;

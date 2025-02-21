import OrderItem from "./OrderItem";

const Orders = () => {
  return (
    <div className="text-sm min-h-screen">
      <div className="pb-5">
        <h1 className="font-semibold">All Orders</h1>
        {/* <p>From Anytime</p> */}
      </div>
      <div className="space-y-2">
        {[1, 1, 1, 1, 1].map((_, index) => (
          <OrderItem key={index} />
        ))}
      </div>
    </div>
  );
};

export default Orders;

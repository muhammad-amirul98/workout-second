import CartItem from "./CartItem";
import PricingCard from "./PricingCard";

const Cart = () => {
  return (
    <div className="pt-10 px-5 sm:px-10 md:px-60 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* CART ITEM */}
        <div className="lg:col-span-2 space-y-3">
          {[1, 1, 1, 1, 1].map((_, index) => (
            <CartItem key={index} />
          ))}
        </div>

        {/* PRICING CARD */}
        <div className="col-span-1 text-sm space-y-3 border rounded-md p-5 border-gray-300">
          <PricingCard />
        </div>
      </div>
    </div>
  );
};

export default Cart;

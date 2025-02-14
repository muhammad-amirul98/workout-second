import image1 from "../../../assets/gym2.avif";

const CartItem = () => {
  return (
    <div className="border rounded-md relative border-gray-300">
      <div className="p-5 flex gap-3">
        <div>
          <img src={image1} className="w-[90px] rounded-md" />
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold text-lg">Optimum Nutrition</h1>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

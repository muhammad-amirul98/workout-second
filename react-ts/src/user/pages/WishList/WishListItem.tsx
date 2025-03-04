import { Product } from "../../../types/ProductTypes";

const WishListItem = ({ product }: { product: Product }) => {
  return (
    <div className="p-5">
      <div>{product.name}</div>
    </div>
  );
};

export default WishListItem;

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import WishListItem from "./WishListItem";
import { getWishList } from "../../../state/user/wishListSlice";

const WishList = () => {
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");
  const wishlist = useAppSelector((store) => store.wishlist);

  useEffect(() => {
    if (jwt) {
      dispatch(getWishList(jwt));
    }
  }, []);

  return (
    <div className="h-[85vh] p-5 lg:p-20">
      <div>
        <h1>My WishList: {wishlist.wishlist?.products.length} items</h1>
        <div className="pt-10 flex-wrap flex gap-5">
          {wishlist.wishlist?.products.map((product, index) => (
            <WishListItem key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishList;

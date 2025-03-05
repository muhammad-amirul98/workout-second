import { IconButton } from "@mui/material";
import { Product } from "../../../types/ProductTypes";
import { Close } from "@mui/icons-material";
import { useAppDispatch } from "../../../state/store";
import { deleteProductFromWishList } from "../../../state/user/wishListSlice";
import { useNavigate } from "react-router-dom";

const WishListItem = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const handleDeleteWishListItem = () => {
    if (jwt && product.id) {
      dispatch(deleteProductFromWishList({ productId: product.id, jwt }));
      window.location.reload();
    }
  };
  return (
    <div className="space-x-5 w-60 relative ">
      <div className="relative h-80">
        <img
          src={product.images[0]}
          alt=""
          className="w-full h-full object-cover rounded-md cursor-pointer"
          onClick={() => navigate(`/product-details/${product.id}`)}
        />
        {/* Positioning the button inside the image at the top-right */}
        <div className="absolute top-2 right-2">
          <IconButton onClick={() => handleDeleteWishListItem()} color="error">
            <Close className="rounded-full" />
          </IconButton>
        </div>
      </div>
      <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
        <h1 className="font-bold">{product.name}</h1>
        <p>{product.brand}</p>
        <p>${product.price}</p>
      </div>
    </div>
  );
};

export default WishListItem;

import { Button, Divider } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {
  Add,
  AddShoppingCart,
  Favorite,
  LocalShipping,
  Remove,
  Shield,
  Wallet,
  WorkspacePremium,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import SimilarProduct from "./SimilarProduct";
import ReviewCard from "../Review/ReviewCard";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../../state/user/userProductSlice";
import { addItemToCart } from "../../../state/user/userCartSlice";

const ProductDetail = () => {
  const dispatch = useAppDispatch();
  const { productId } = useParams<{ productId: string }>();
  const { userproduct } = useAppSelector((store) => store);
  const [quantity, setQuantity] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const jwt = localStorage.getItem("jwt");

  const handleChangeActiveImage = (value: number) => {
    setActiveImage(value);
  };

  const add = () => {
    setQuantity(quantity + 1);
  };

  const minus = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    if (jwt) {
      dispatch(addItemToCart({ jwt, productId: Number(productId) }));
    }
  };

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [productId, dispatch]);

  return (
    <div className="px-5 lg:px-20 pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        <section className="flex flex-col lg:flex-row gap-5">
          {/* SIDE IMAGES */}
          <div className="flex flex-wrap lg:flex-col w-full lg:w-[15%] gap-3">
            {userproduct.product?.images.map((image, index) => (
              <img
                onClick={() => handleChangeActiveImage(index)}
                className="rounded-md lg:w-full w-[50px] cursor-pointer "
                key={index}
                src={image}
              />
            ))}
          </div>
          {/* MAIN IMAGE */}
          <div className="w-full lg:w-[85%]">
            <img
              className="w-full rounded-md"
              src={userproduct.product?.images[activeImage]}
              alt=""
            />
          </div>
        </section>

        {/* PRODUCT DETAILS */}
        <section>
          <h1 className="font-bold text-lg">{userproduct.product?.brand}</h1>
          <p className="text-gray-500 font-semibold">
            {userproduct.product?.name}
          </p>
          <div className="flex justify-between items-center py-2 border border-gray-400 w-[180px] px-3 mt-5">
            <div className="flex gap-1 items-center ">
              <span>4</span>
              <StarIcon sx={{ color: "teal" }} />
            </div>
            <Divider orientation="vertical" flexItem />
            <span>234 ratings</span>
          </div>
          <div>
            <div className="price flex items-center gap-3 mt-5 text-2xl">
              <span className="font-sans text-gray-800">
                ${userproduct.product?.price}
              </span>
            </div>
            <p className="text-sm">Free Shipping Above 200$.</p>
          </div>
          <div className="mt-7 space-y-3">
            <div className="flex items-center gap-4">
              <Shield sx={{ color: "teal" }} />
              <p>Authentic and quality assured.</p>
            </div>
            <div className="flex items-center gap-4">
              <WorkspacePremium sx={{ color: "teal" }} />
              <p>100% money back guarantee.</p>
            </div>
            <div className="flex items-center gap-4">
              <LocalShipping sx={{ color: "teal" }} />
              <p>Free Returns.</p>
            </div>
            <div className="flex items-center gap-4">
              <Wallet sx={{ color: "teal" }} />
              <p>Pay on delivery available.</p>
            </div>
          </div>

          {/* QUANTITY ADD REMOVE */}
          <div className="mt-7 space-y-2">
            <h1 className="items-center">QUANTITY:</h1>
            <div className="flex items-center gap-2 w-[140px] justify-between">
              <Button onClick={minus}>
                <Remove />
              </Button>
              <span>{quantity}</span>
              <Button onClick={add}>
                <Add />
              </Button>
            </div>
          </div>

          {/* ADD CART BUTTONS */}
          <div className="mt-12 flex items-center gap-5">
            <Button
              fullWidth
              startIcon={<AddShoppingCart />}
              sx={{ py: "1rem" }}
              variant="contained"
              onClick={addToCart}
            >
              Add to cart
            </Button>
            <Button
              fullWidth
              startIcon={<Favorite />}
              sx={{ py: "1rem" }}
              variant="outlined"
            >
              Add to Wishlist
            </Button>
          </div>
          {/* DESCRIPTION */}
          <div className="mt-7 space-y-5">
            <ReviewCard />
            <Divider />
          </div>
        </section>
      </div>
      <div className="mt-20">
        <h1 className="text-lg font-bold">SIMILAR PRODUCTS</h1>
        <div className="pt-5">
          <SimilarProduct />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

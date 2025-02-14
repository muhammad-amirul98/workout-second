import { Button, Divider } from "@mui/material";
import image1 from "../../../assets/weights.avif";
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
import { useState } from "react";
import ONProductDescription from "./ONProductDescription";
import SimilarProduct from "./SimilarProduct";
import ReviewCard from "../Review/ReviewCard";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(0);
  const add = () => {
    setQuantity(quantity + 1);
  };

  const minus = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="px-5 lg:px-20 pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        <section className="flex flex-col lg:flex-row gap-5">
          {/* SIDE IMAGES */}
          <div className="flex flex-wrap lg:flex-col w-full lg:w-[15%] gap-3">
            {[1, 1, 1, 1].map((_, index) => (
              <img
                className="rounded-md lg:w-full w-[50px] cursor-pointer "
                key={index}
                src={image1}
              />
            ))}
          </div>
          {/* MAIN IMAGE */}
          <div className="w-full lg:w-[85%]">
            <img className="w-full rounded-md" src={image1} alt="" />
          </div>
        </section>

        {/* PRODUCT DETAILS */}
        <section>
          <h1 className="font-bold text-lg">OPTIMUM NUTRITION</h1>
          <p className="text-gray-500 font-semibold">
            GOLD STANDARD 100% WHEY™
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
              <span className="font-sans text-gray-800">$100</span>
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
          <ONProductDescription />
          <div></div>
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

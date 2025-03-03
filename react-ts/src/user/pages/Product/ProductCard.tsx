import "./ProductCard.css";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Favorite, ModeComment } from "@mui/icons-material";
import { Product } from "../../../types/ProductTypes";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item }: { item: Product }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let interval: any;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % item.images.length);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
      interval = null;
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div
      onClick={() => navigate(`/product-details/${item.name}/${item.id}`)}
      className="group px-4 relative"
    >
      <div
        className="card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {item.images.map((image, index) => (
          <img
            key={index}
            className="card-media "
            src={image}
            alt=""
            style={{
              transform: `translateX(${(index - currentImage) * 100}%)`,
            }}
          />
        ))}
        {isHovered && (
          <div className="indicator flex flex-col items-center space-y-2">
            <div className="flex gap-3">
              <Button variant="contained">
                <Favorite />
              </Button>
              <Button variant="contained">
                <ModeComment />
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
        <div className="name">
          <h1 className="font-bold">Optimum Nutrition</h1>
          <p>GOLD STANDARD 100% WHEY™</p>
          <p>$100</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

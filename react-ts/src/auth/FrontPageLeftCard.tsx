import { useEffect, useState } from "react";
import img1 from "../assets/IMAGE 2025-04-02 10:18:37.jpg";
import img2 from "../assets/IMAGE 2025-04-02 10:19:10.jpg";
import img3 from "../assets/IMAGE 2025-04-02 10:24:34.jpg";

const FrontPageLeftCard = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [img1, img2, img3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[85vh] h-[85vh] overflow-hidden rounded-md shadow-lg">
      {images.map((image, index) => (
        <img
          key={index}
          className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out p-2 rounded-md ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          src={image}
          alt="Sliding Image"
        />
      ))}
    </div>
  );
};

export default FrontPageLeftCard;

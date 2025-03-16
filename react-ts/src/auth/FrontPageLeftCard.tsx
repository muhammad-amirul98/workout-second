import { useEffect, useState } from "react";
import background from "../assets/background.jpeg";
import img1 from "../assets/gym1.avif";
import img2 from "../assets/gym2.avif";
import img3 from "../assets/gym3.avif";

const FrontPageLeftCard = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [background, img1, img2, img3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[450px] h-[85vh] overflow-hidden rounded-md shadow-lg">
      {images.map((image, index) => (
        <img
          key={index}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
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

import { useState } from "react";
import image from "../../../assets/Strength.avif";

const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-64 h-64 cursor-pointer perspective"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`w-full h-full transition-transform duration-700 transform ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full bg-blue-500 rounded-lg flex items-center justify-center backface-hidden">
          <img
            // src="https://via.placeholder.com/200"
            src={image}
            alt="Front"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 w-full h-full bg-gray-800 text-white rounded-lg flex items-center justify-center rotate-y-180 backface-hidden">
          <p className="text-lg font-semibold">Hello! 👋</p>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;

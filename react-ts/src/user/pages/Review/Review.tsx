import { Divider } from "@mui/material";
import image from "../../../assets/gym2.avif";
import ReviewCard from "./ReviewCard";

const Review = () => {
  return (
    <div className="p-5 lg:px-20 flex flex-col lg:flex-row gap-20">
      <section className="w-full md:w-1/2 lg:w-[30%] space-y-2">
        <img src={image} alt="" />
        <div>
          <div>
            <p className="font-bold text-xl">Optimum Nutrition</p>
            <p className="text-lg text-gray-600">Premium Whey</p>
          </div>
          <div className="price flex items-center gap-3 mt-5 text-2xl">
            <span className="font-sans text-gray-800">$100</span>
          </div>
        </div>
      </section>
      <section className="space-y-5 w-full">
        {[1, 1, 1, 1].map((_, index) => (
          <div className="space-y-5 mb-5">
            <ReviewCard key={index} />
            <Divider />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Review;

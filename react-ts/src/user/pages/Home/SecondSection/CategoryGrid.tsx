import image from "../../../assets/band.avif";
import image2 from "../../../assets/exercise.avif";
import image3 from "../../../assets/gym1.avif";
import image4 from "../../../assets/gym2.avif";
import image5 from "../../../assets/gym3.avif";
import image6 from "../../../assets/gym4.avif";

const CategoryGrid = () => {
  return (
    <div className="grid gap-4 grid-rows-12 grid-cols-12 h-[600px] lg:h-[600px] px-5 lg:px-20">
      <div className="col-span-3 row-span-12">
        <img src={image4} alt="band" className="w-full h-full object-cover" />
      </div>
      <div className="col-span-2 row-span-6">
        <img
          src={image2}
          alt="exercise"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="col-span-4 row-span-6">
        <img src={image3} alt="gym" className="w-full h-full object-cover" />
      </div>
      <div className="col-span-3 row-span-12">
        <img src={image} alt="gym" className="w-full h-full object-cover" />
      </div>
      <div className="col-span-2 row-span-6">
        <img src={image5} alt="gym" className="w-full h-full object-cover" />
      </div>
      <div className="col-span-4 row-span-6">
        <img src={image6} alt="gym" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default CategoryGrid;

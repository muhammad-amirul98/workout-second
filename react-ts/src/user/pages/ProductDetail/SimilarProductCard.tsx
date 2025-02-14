import image from "../../../assets/gym3.avif";

const SimilarProductCard = () => {
  return (
    <div className="group px-4 relative">
      <div className="card">
        <img className="card-media object-top" src={image} alt="" />
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

export default SimilarProductCard;

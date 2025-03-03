import SimilarProductCard from "./SimilarProductCard";

const SimilarProduct = () => {
  return (
    <div className="grid  md:grid-cols-4 sm:grid-cols-2 grid-cols-1">
      {[1, 1, 1, 1, 1, 1, 1].map((_, index) => (
        <SimilarProductCard key={index} />
      ))}
    </div>
  );
};

export default SimilarProduct;

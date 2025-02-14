import CategoryCard from "./CategoryCard";

const Category = () => {
  return (
    <div className="flex flex-wrap justify-between py-5 lg:px-20 border-b">
      {[1, 1, 1, 1, 1].map((_, index) => (
        <CategoryCard key={index} />
      ))}
    </div>
  );
};

export default Category;

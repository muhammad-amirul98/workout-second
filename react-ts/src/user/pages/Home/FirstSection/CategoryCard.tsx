import StrengthImage from "../../../../assets/Strength.avif";

const CategoryCard = () => {
  return (
    <div>
      <img src={StrengthImage} alt="Strength" className="object-contain h-10" />
      <h2 className="secondary-text">Strength</h2>
    </div>
  );
};

export default CategoryCard;

import image from "../../../../assets/gym5.avif";
// import image1 from "../../assets/gym6.avif";
// import image2 from "../../assets/gym7.avif";

const SectionCard = () => {
  return (
    <div className="w-[15rem] cursor-pointer">
      <img
        className="w-full h-[15rem] object-cover object-top"
        src={image}
        alt=""
      />
      <div className="text-center bg-black">
        <p className="secondary-text font-semibold">random</p>
      </div>
    </div>
  );
};

export default SectionCard;

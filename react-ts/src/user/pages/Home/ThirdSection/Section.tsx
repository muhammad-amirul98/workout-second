import SectionCard from "./SectionCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Section = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 8000,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 0, // Makes it slide continuously
    cssEase: "linear", // Change slide every 3 seconds

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-5 lg:px-20 w-full">
      <Slider {...settings} className="space-x-4">
        {Array.from({ length: 10 }, (_, index) => (
          <SectionCard key={index} />
        ))}
      </Slider>
    </div>
  );
};

export default Section;

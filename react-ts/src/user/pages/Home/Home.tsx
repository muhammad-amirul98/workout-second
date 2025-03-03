import CategoryGrid from "./SecondSection/CategoryGrid";
import Category from "./FirstSection/Category";
import Section from "./ThirdSection/Section";
import FourthSection from "./FourthSection/FourthSection";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import FlipCard from "./FourthSection/FlipCard";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-5 lg:space-y-10 relative pb-20">
      <Button variant="contained" onClick={() => navigate("/auth")}>
        Login
      </Button>
      <div>
        <h1 className="text-center text-2xl lg:text-4l logo pt-2">Workout</h1>
        <Category />
      </div>
      <div>
        <h1 className="text-center text-2xl lg:text-4l logo pt-2">Analysis</h1>
        <Section />
      </div>
      <div>
        <h1 className="text-center text-2xl lg:text-4l logo pt-2">
          User Interaction
        </h1>
        <CategoryGrid />
      </div>
      <div>
        <h1 className="text-center text-2xl lg:text-4l logo pt-2">
          Supplements
        </h1>
        <FourthSection />
      </div>
      {/* <FlipCard /> */}
    </div>
  );
};

export default Home;

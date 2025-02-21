import { Route, Routes } from "react-router-dom";
import Workout from "../Dashboard/Workout";
import AddWorkout from "../Dashboard/AddWorkout";
import WorkoutLog from "../Dashboard/WorkoutLog";
import Progress from "../Dashboard/Progress";
import Product from "../Product/Product";
import Orders from "../Account/Orders";

const DashboardRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/workouts" element={<Workout />} />
        <Route path="/addworkout" element={<AddWorkout />} />
        <Route path="/workout-logs" element={<WorkoutLog />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/shop" element={<Product />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
};

export default DashboardRoutes;

import { Route, Routes } from "react-router-dom";
import Workout from "../Dashboard/Workout";
import WorkoutLog from "../Dashboard/WorkoutLog";
import Product from "../Product/Product";
import Orders from "../Account/Orders";
import Exercise from "../Dashboard/Exercise";
import CurrentWorkout from "../Dashboard/CurrentWorkout";
import WorkoutCharts from "../Dashboard/WorkoutCharts";
import BodyMeasurements from "../Dashboard/BodyMeasurements";

const DashboardRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/workouts" element={<Workout />} />
        <Route path="/current-workout" element={<CurrentWorkout />} />
        <Route path="/workout-logs" element={<WorkoutLog />} />
        <Route path="/progress" element={<WorkoutCharts />} />
        <Route path="/shop" element={<Product />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/bm" element={<BodyMeasurements />} />
      </Routes>
    </div>
  );
};

export default DashboardRoutes;

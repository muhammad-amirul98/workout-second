import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import ChartTemplate from "./ChartTemplate"; // Import the reusable component
import { fetchWorkoutCount } from "../../../state/user/userWorkoutSlice";

const WorkoutCountChart = () => {
  const userworkout = useAppSelector((store) => store.userworkout);
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    if (!jwt) return;
    dispatch(fetchWorkoutCount(jwt));
  }, []);
  return (
    <ChartTemplate
      data={userworkout.workoutCountData || []}
      chartTitle="Workout Count"
      dataKey="workoutCount"
      downloadFileName="workout_count"
      xAxisKey="period"
      chartType="workoutCount" // Specify the chart type
    />
  );
};

export default WorkoutCountChart;

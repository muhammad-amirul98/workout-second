import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import ChartTemplate from "./ChartTemplate";
import { fetchWorkoutVolume } from "../../../state/user/userWorkoutSlice";

const WorkoutProgress = () => {
  const userworkout = useAppSelector((store) => store.userworkout);
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    if (!jwt) return;
    dispatch(fetchWorkoutVolume(jwt));
  }, []);

  const formattedData =
    userworkout.data?.map((log) => ({
      ...log,
      date: new Date(log.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    })) || [];

  return (
    <ChartTemplate
      data={formattedData}
      chartTitle="Workout Volume (KG)"
      dataKey="totalWeight"
      downloadFileName="workout_volume"
      xAxisKey="date"
      chartType="workoutVolume" // Specify the chart type
    />
  );
};

export default WorkoutProgress;

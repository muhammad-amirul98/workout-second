import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchWorkoutCount } from "../../../state/user/userWorkoutSlice";
import { WorkoutCount } from "../../../types/WorkoutTypes";
import BarChartTemplate from "./BarChartTemplate";

const WorkoutCountChart = () => {
  const userworkout = useAppSelector((store) => store.userworkout);
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");

  //REAL DATA
  useEffect(() => {
    if (!jwt) return;
    dispatch(fetchWorkoutCount(jwt));
  }, []);
  console.log(userworkout.workoutCountData);

  //FAKE DATA
  const generateRealisticWeeklyWorkoutCountData = (): WorkoutCount[] => {
    const fakeData: WorkoutCount[] = [];
    const today = new Date();

    // Get the start of the current week (Sunday)
    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay());

    // Track the number of workouts per week for 52 weeks
    for (let i = 0; i < 52; i++) {
      const weekStartDate = new Date(currentWeekStart);

      let weeklyCount = 0;

      for (let j = 0; j < 7; j++) {
        // Each day has either 1 workout or 0 (20% chance of rest)
        const hasWorkout = Math.random() >= 0.2 ? 1 : 0;
        weeklyCount += hasWorkout;
      }

      fakeData.push({
        period: `${weekStartDate.toISOString().split("T")[0]} to ${
          new Date(weekStartDate.setDate(weekStartDate.getDate() + 6))
            .toISOString()
            .split("T")[0]
        }`, // Format as 'YYYY-MM-DD to YYYY-MM-DD'
        count: weeklyCount, // Total workouts for the week
      });

      // Move to the next week
      currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    }

    return fakeData;
  };

  const fakeWeeklyWorkoutCountData = generateRealisticWeeklyWorkoutCountData();

  return (
    <BarChartTemplate
      data={fakeWeeklyWorkoutCountData}
      chartTitle="Workout Count"
      dataKey="count"
      downloadFileName="workout_count"
      xAxisKey="period"
      chartType="workoutCount" // Specify the chart type
    />
  );
};

export default WorkoutCountChart;

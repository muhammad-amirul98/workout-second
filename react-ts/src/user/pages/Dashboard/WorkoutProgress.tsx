import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import LineChartTemplate from "./LineChartTemplate";
import { fetchWorkoutVolume } from "../../../state/user/userWorkoutSlice";
import { WorkoutVolume } from "../../../types/WorkoutTypes";
import { TooltipProps } from "recharts";

const WorkoutProgress = () => {
  const userworkout = useAppSelector((store) => store.userworkout);
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");
  //REAL DATA
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
  console.log(formattedData);

  //FAKE DATA
  const generateRealisticWorkoutVolumeData = (): WorkoutVolume[] => {
    const fakeData: WorkoutVolume[] = [];
    const today = new Date();

    let totalVolume = 4500; // Starting total weight (kg)
    const weeklyProgression = 2.5 * 5 * 5 * 5; // ~312.5kg increase per exercise every 1-2 weeks

    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i); // Go back day by day

      // Randomly skip some days (rest days), ~20% chance to skip
      const skipDay = Math.random() < 0.2; // ~20% chance to skip
      if (skipDay) {
        // Explicitly set total weight lifted to 0 for skipped days
        fakeData.push({
          date: date.toISOString().split("T")[0], // Format as 'YYYY-MM-DD'
          totalWeightLiftedInWorkout: 0, // No workout on this day
        });
        continue; // Skip further logic for this day
      }

      // Progression: Increase volume slightly every 7-14 days
      if (i % (7 + Math.floor(Math.random() * 7)) === 0) {
        totalVolume += weeklyProgression;
      }

      // Smaller random variation for realism (+/- 5%)
      const adjustedVolume = totalVolume * (0.95 + Math.random() * 0.1); // Reduced deviation

      // Round to nearest 0.5kg (weights come in 1.25, 2.5, 5, etc.)
      const finalVolume = Math.round(adjustedVolume * 2) / 2;

      // Total volume for the day (1 workout per day, no multiple workouts)
      const dailyVolume = finalVolume;

      fakeData.push({
        date: date.toISOString().split("T")[0], // Format as 'YYYY-MM-DD'
        totalWeightLiftedInWorkout: dailyVolume, // Volume for the day
      });
    }

    return fakeData;
  };

  const fakeData = generateRealisticWorkoutVolumeData();

  const customToolTip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      // Get the unique date from the payload
      const date = payload[0].payload.date;

      // Filter payloads for the current date (in case of multiple entries per day)
      const sessions = payload.filter((entry) => entry.payload.date === date);

      return (
        <div className="bg-white p-2 border rounded shadow-md">
          <p className="text-sm font-semibold text-gray-700">📅 Date: {date}</p>
          <p className="text-md font-bold text-teal-600">
            🏋️‍♂️ Total Volume:{" "}
            {sessions
              .filter((session) => session.value !== undefined) // Check if session exists
              .reduce((sum, session) => sum + (session?.value ?? 0), 0)}{" "}
            kg
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <LineChartTemplate
      data={fakeData}
      chartTitle="Workout Volume (KG)"
      dataKey="totalWeightLiftedInWorkout"
      downloadFileName="workout_volume"
      xAxisKey="date"
      customToolTip={customToolTip}
      chartType="workoutVolume" // Specify the chart type
    />
  );
};

export default WorkoutProgress;

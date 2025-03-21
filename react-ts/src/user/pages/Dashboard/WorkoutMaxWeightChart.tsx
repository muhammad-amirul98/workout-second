import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchWorkoutMaxWeights } from "../../../state/user/userWorkoutSlice";
import LineChartTemplate from "./LineChartTemplate";
import { MaxWeight } from "../../../types/WorkoutTypes";
import { TooltipProps } from "recharts";

const WorkoutMaxWeightChart = () => {
  const userworkout = useAppSelector((store) => store.userworkout);
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");
  //REAL DATA
  useEffect(() => {
    if (!jwt) return;
    dispatch(fetchWorkoutMaxWeights(jwt));
  }, []);
  console.log(userworkout.workoutMaxWeights);

  //FAKE DATA
  const exercises = [
    "Bench Press",
    "Squat",
    "Deadlift",
    "Overhead Press",
    "Barbell Row",
  ];

  const generateRealisticMaxWeightData = (): MaxWeight[] => {
    const fakeData: MaxWeight[] = [];
    const today = new Date();
    const exerciseProgression: Record<string, number> = {
      "Bench Press": 40,
      Squat: 40,
      Deadlift: 60,
      "Overhead Press": 20,
      "Barbell Row": 20,
    };

    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const formattedDate = date.toISOString().split("T")[0];

      exercises.forEach((exercise) => {
        // Ensure each exercise is only done on at most 2 separate days per week
        if (Math.random() < 0.7) return; // ~70% chance to skip (ensures ~2 sessions per week)

        // Progressive overload: Increase weight slightly every 1-2 weeks
        if (i % (7 + Math.floor(Math.random() * 7)) === 0) {
          exerciseProgression[exercise] += 2.5; // Small progressive increase
        }

        // Add random fluctuation of ±2.5% for realism
        const adjustedWeight =
          exerciseProgression[exercise] * (0.975 + Math.random() * 0.05);
        const finalWeight = Math.round(adjustedWeight * 2) / 2; // Round to nearest 0.5kg

        // Random reps between 3-10
        const reps = Math.floor(Math.random() * 8) + 3;

        fakeData.push({
          date: formattedDate,
          exercise,
          weight: finalWeight,
          reps,
        });
      });
    }

    return fakeData;
  };

  const fakeMaxWeights = generateRealisticMaxWeightData();

  const groupedData = useMemo(() => {
    const groups: Record<string, MaxWeight[]> = {};
    fakeMaxWeights?.forEach((entry) => {
      if (!groups[entry.exercise]) {
        groups[entry.exercise] = [];
      }
      groups[entry.exercise].push(entry);
    });
    return groups;
  }, [fakeMaxWeights]);

  // const groupedData = useMemo(() => {
  //   const groups: Record<string, MaxWeight[]> = {};
  //   userworkout.workoutMaxWeights?.forEach((entry) => {
  //     if (!groups[entry.exercise]) {
  //       groups[entry.exercise] = [];
  //     }
  //     groups[entry.exercise].push(entry);
  //   });
  //   return groups;
  // }, [userworkout.workoutMaxWeights]);

  const customToolTip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      // Get the unique date from the payload
      const date = payload[0].payload.date;
      const weight = payload[0].payload.weight;
      const reps = payload[0].payload.reps;

      return (
        <div className="bg-white p-2 border rounded shadow-md">
          <p className="text-sm font-semibold text-gray-700">📅 Date: {date}</p>
          <p className="text-md font-bold text-teal-600">
            🏋️‍♂️ {weight} KG x {reps} reps
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      {Object.entries(groupedData).map(([exercise, data]) => (
        <div key={exercise} className="mb-6">
          <LineChartTemplate
            data={data}
            chartTitle={`Max Weight for ${exercise}`}
            dataKey="weight" // Y-axis
            xAxisKey="date" // X-axis
            downloadFileName={`max_weight_${exercise}`}
            chartType="maxWeight"
            customToolTip={customToolTip}
          />
        </div>
      ))}
    </div>
  );
};

export default WorkoutMaxWeightChart;

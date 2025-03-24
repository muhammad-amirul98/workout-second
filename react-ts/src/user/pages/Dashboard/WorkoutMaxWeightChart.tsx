import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchWorkoutMaxWeights } from "../../../state/user/userWorkoutSlice";
import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { CSVLink } from "react-csv";
import AssessmentIcon from "@mui/icons-material/Assessment";
import {
  Tooltip as MuiTooltip,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import html2canvas from "html2canvas";

interface ExerciseData {
  date: string;
  weight: number;
  reps: number;
}

interface ChartData {
  date: string;
  exercises: Record<string, ExerciseData>;
}

const WorkoutMaxWeightChart = () => {
  const userworkout = useAppSelector((store) => store.userworkout);
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");
  const chartRef = useRef<HTMLDivElement | null>(null);

  //REAL DATA
  useEffect(() => {
    if (!jwt) return;
    dispatch(fetchWorkoutMaxWeights(jwt));
  }, []);
  console.log(userworkout.workoutMaxWeights);

  const exercises = Array.from(
    new Set(userworkout.workoutMaxWeights?.map((item) => item.exercise))
  );

  const generatePresetColors = (count: number) => {
    return Array.from(
      { length: count },
      (_, i) => `hsl(220, 100%, ${30 + i * 10}%)`
    );
  };

  // Get a fixed set of colors based on the number of exercises
  const presetColors = generatePresetColors(exercises.length);

  // Assign colors based on exercise order
  const colors: Record<string, string> = exercises.reduce(
    (acc, exercise, index) => {
      acc[exercise] = presetColors[index % presetColors.length]; // Cycle through colors if exercises exceed presets
      return acc;
    },
    {} as Record<string, string>
  );

  const [selectedExercises, setSelectedExercises] = useState<
    Record<string, boolean>
  >(
    exercises.reduce((acc, exercise) => {
      acc[exercise] = true;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleCheckboxChange = (exercise: string) => {
    setSelectedExercises((prev) => ({
      ...prev,
      [exercise]: !prev[exercise],
    }));
  };

  //FORMATTED REAL DATA
  const realData: ChartData[] = useMemo(() => {
    const grouped: Record<string, ChartData> = {}; // { date: { exercise: weight, ... } }

    userworkout.workoutMaxWeights?.forEach(
      ({ date, exercise, weight, reps }) => {
        if (!grouped[date]) {
          grouped[date] = { date, exercises: {} }; // Initialize object with date
        }
        grouped[date].exercises[exercise] = { date, weight, reps }; // Assign weight to the corresponding exercise
      }
    );

    return Object.values(grouped).sort((a, b) => a.date.localeCompare(b.date)); // Convert object to array & sort by date
  }, [userworkout.workoutMaxWeights]);

  //CUSTOM TOOL TIP

  const customToolTip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const date = payload[0].payload.date; // Assuming date is a string or date-like object

      return (
        <div className="bg-white p-2 border rounded shadow-md">
          <p className="text-sm font-semibold text-gray-700">📅 Date: {date}</p>
          {payload.map((entry) => {
            const exercise = entry.name;
            if (exercise) {
              const { weight, reps } =
                entry.payload.exercises?.[exercise] || {}; // Get weight and reps from payload

              return (
                <p
                  key={exercise}
                  className="text-md font-bold"
                  style={{ color: entry.color }}
                >
                  🏋️‍♂️ {exercise}: {weight} KG, Reps: {reps}
                </p>
              );
            }
            return null;
          })}
        </div>
      );
    }
    return null;
  };

  const downloadChartAsImage = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        const imageUrl = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = "workout_maxweight.png";
        link.click();
      });
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full">
        <h2 className="secondary-text text-xl">Max Weight Progression</h2>
        <div className="flex items-center">
          <MuiTooltip title="Export to CSV" arrow>
            <span>
              <CSVLink data={realData} filename={`maxweightchart.csv`}>
                <IconButton color="primary" size="small">
                  <AssessmentIcon />
                </IconButton>
              </CSVLink>
            </span>
          </MuiTooltip>

          <MuiTooltip title="Download chart image" arrow>
            <span>
              <IconButton
                color="primary"
                onClick={() => {
                  if (chartRef.current) {
                    downloadChartAsImage();
                  }
                }}
              >
                <ImageIcon />
              </IconButton>
            </span>
          </MuiTooltip>
        </div>
      </div>

      <div className="w-full p-5" ref={chartRef}>
        <div className="mb-5">
          {exercises.map((exercise) => (
            <FormControlLabel
              key={exercise}
              control={
                <Checkbox
                  checked={selectedExercises[exercise]}
                  onChange={() => handleCheckboxChange(exercise)}
                  color="primary" // Set the color as you wish
                />
              }
              label={exercise}
            />
          ))}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            height={1000}
            // data={chartData}
            data={realData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={customToolTip} />
            <Legend />
            {Object.keys(colors).map(
              (exercise) =>
                selectedExercises[exercise] && (
                  <Line
                    key={exercise}
                    type="monotone"
                    dataKey={(realData: ChartData) =>
                      realData.exercises[exercise]?.weight
                    }
                    stroke={colors[exercise]}
                    name={exercise}
                    strokeWidth={2}
                  />
                )
            )}
            <Brush dataKey="date" height={30} stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WorkoutMaxWeightChart;

// //FAKE DATA

// const fakeExercises = [
//   "Bench Press",
//   "Squat",
//   "Deadlift",
//   "Overhead Press",
//   "Barbell Row",
// ];
// const generateFakeMaxWeightData = (): MaxWeight[] => {
//   const fakeData: MaxWeight[] = [];
//   const today = new Date();

//   // Initial starting weights for each exercise
//   const exerciseProgression: Record<string, number> = {
//     "Bench Press": 40,
//     Squat: 40,
//     Deadlift: 60,
//     "Overhead Press": 20,
//     "Barbell Row": 20,
//   };

//   // Generate data for the past 365 days
//   for (let i = 364; i >= 0; i--) {
//     const date = new Date(today);
//     date.setDate(today.getDate() - i);
//     const formattedDate = date.toISOString().split("T")[0];

//     fakeExercises.forEach((exercise) => {
//       // Ensure each exercise is done at most twice per week
//       if (Math.random() < 0.7) return; // ~70% chance to skip (ensures ~2 sessions per week)

//       // Progressive overload: Increase weight slightly every 1-2 weeks
//       if (i % (7 + Math.floor(Math.random() * 7)) === 0) {
//         exerciseProgression[exercise] += 2.5;
//       }

//       // Add random fluctuation of ±2.5% for realism
//       const adjustedWeight =
//         exerciseProgression[exercise] * (0.975 + Math.random() * 0.05);
//       const finalWeight = Math.round(adjustedWeight * 2) / 2; // Round to nearest 0.5kg

//       // Random reps between 3-10
//       const reps = Math.floor(Math.random() * 8) + 3;

//       fakeData.push({
//         date: formattedDate,
//         exercise,
//         weight: finalWeight,
//         reps,
//       });
//     });
//   }

//   return fakeData;
// };

// const fakeMaxWeights = generateFakeMaxWeightData();

// const fakeFormattedData: ChartData[] = useMemo(() => {
//   const grouped: Record<string, ChartData> = {}; // { date: { date, exercises: { ... } } }

//   fakeMaxWeights.forEach(({ date, exercise, weight, reps }) => {
//     if (!grouped[date]) {
//       grouped[date] = { date, exercises: {} }; // Initialize object with date and an empty exercises record
//     }
//     grouped[date].exercises[exercise] = { date, weight, reps }; // Store exercise data under exercises key
//   });

//   // Convert the grouped object to an array and sort by date
//   return Object.values(grouped).sort((a, b) => a.date.localeCompare(b.date));
// }, [fakeMaxWeights]);

// console.log(fakeFormattedData[0]);

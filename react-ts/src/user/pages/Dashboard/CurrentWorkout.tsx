import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import {
  cancelWorkout,
  fetchCurrentWorkout,
} from "../../../state/user/userWorkoutSlice";
import CurrentWorkoutTable from "./CurrentWorkoutTable";
import PlateWorkoutCalculator from "./PlateWorkoutCalculator";

const CurrentWorkout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userworkout = useAppSelector((store) => store.userworkout);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (!jwt) return;
    dispatch(fetchCurrentWorkout(jwt));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  const handleCalculatorOpen = () => {
    setCalculatorOpen(true);
  };

  const handleCalculatorClose = () => {
    setCalculatorOpen(false);
  };

  const handleCancelWorkout = () => {
    if (!jwt || !userworkout.currentWorkout) return;
    dispatch(
      cancelWorkout({ jwt, workoutLogId: userworkout.currentWorkout.id })
    );
  };

  return (
    <div className="justify-center">
      {userworkout.currentWorkout ? (
        <div>
          <div>
            <Button
              variant="contained"
              color="primary"
              sx={{ mb: 2 }}
              onClick={handleCalculatorOpen}
              fullWidth
            >
              Plate Calculator
            </Button>
            <PlateWorkoutCalculator
              open={calculatorOpen}
              onClose={handleCalculatorClose}
            />
          </div>
          <div>
            <CurrentWorkoutTable currentWorkout={userworkout.currentWorkout} />
          </div>
          <div className="mt-5">
            <Button
              color="error"
              variant="contained"
              fullWidth
              onClick={handleCancelWorkout}
            >
              Cancel Workout
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex-col items-center">
          <div className="flex flex-col font-bold mb-4 justify-center items-center">
            <p>You have no workout currently selected. </p>
            <p>Choose a workout to begin.</p>
          </div>
          <div>
            <Button
              onClick={() => navigate("/dashboard/workouts")}
              variant="contained"
              fullWidth
            >
              Select Workout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentWorkout;

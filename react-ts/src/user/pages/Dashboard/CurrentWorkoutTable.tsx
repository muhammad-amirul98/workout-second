import {
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { WorkoutLog } from "../../../types/WorkoutTypes";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../component/TableComponent";
import CurrentWorkoutExerciseRow from "./CurrentWorkoutExerciseRow";
import { timeDuration, timeFormat } from "../Util/dateFormat";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { completeWorkout } from "../../../state/user/userWorkoutSlice";

const CurrentWorkoutTable = ({
  currentWorkout,
}: {
  currentWorkout: WorkoutLog;
}) => {
  const [timer, setTimer] = useState("");
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");
  const userworkout = useAppSelector((store) => store.userworkout);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(
        timeDuration(currentWorkout.timeStarted, new Date().toISOString())
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCompleteWorkout = () => {
    if (!jwt) return;
    dispatch(completeWorkout({ jwt, workoutLogId: currentWorkout.id }));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Time Started</StyledTableCell>
            <StyledTableCell align="left">Timer</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>
              {timeFormat(currentWorkout.timeStarted)}
            </StyledTableCell>
            <StyledTableCell>{timer}</StyledTableCell>
            <StyledTableCell align="center">
              <Button
                color="primary"
                onClick={handleCompleteWorkout}
                variant="contained"
                disabled={!userworkout.currentWorkout?.allSetsCompleted}
              >
                Complete Workout
              </Button>
            </StyledTableCell>
          </StyledTableRow>
          {currentWorkout.exerciseLogs.map((exerciseLog) => (
            <CurrentWorkoutExerciseRow
              key={exerciseLog.id}
              exercise={exerciseLog}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CurrentWorkoutTable;

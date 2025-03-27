import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
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
import { style } from "../../../styles/styles";
import AddExerciseToCurrentWorkout from "./AddExerciseToCurrentWorkout";

const CurrentWorkoutTable = ({
  currentWorkout,
}: {
  currentWorkout: WorkoutLog;
}) => {
  const [timer, setTimer] = useState("");
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");
  const userworkout = useAppSelector((store) => store.userworkout);
  const [open, setOpen] = useState(false);
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
          <StyledTableRow>
            <StyledTableCell colSpan={5}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
              >
                Add Exercise
              </Button>
              <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" className="items-center">
                    Add Exercise
                  </Typography>
                  <AddExerciseToCurrentWorkout
                    onClose={() => setOpen(false)}
                    workoutLogId={currentWorkout.id}
                  />
                </Box>
              </Modal>
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CurrentWorkoutTable;

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { Delete, KeyboardArrowDown } from "@mui/icons-material";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../component/TableComponent";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import {
  deleteWorkoutLog,
  fetchAllWorkoutLogsByUser,
} from "../../../state/user/userWorkoutSlice";
import { timeDuration, timeFormat } from "../Util/dateFormat";

export default function WorkoutLogTable() {
  const jwt = localStorage.getItem("jwt");
  const dispatch = useAppDispatch();
  const userworkout = useAppSelector((store) => store.userworkout);

  useEffect(() => {
    if (!jwt) return;

    dispatch(fetchAllWorkoutLogsByUser({ jwt }));
  }, []);

  const handleDeleteWorkoutLog = (workoutLogId: number) => {
    if (!jwt) return;
    dispatch(deleteWorkoutLog({ jwt, workoutLogId }))
      .unwrap()
      .then(() => dispatch(fetchAllWorkoutLogsByUser({ jwt })));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No.</StyledTableCell>

            <StyledTableCell>Time Started</StyledTableCell>
            <StyledTableCell>Time Ended</StyledTableCell>
            <StyledTableCell>Workout Status</StyledTableCell>
            <StyledTableCell>Workout Duration</StyledTableCell>
            <StyledTableCell>View Details</StyledTableCell>
            <StyledTableCell>Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userworkout.workoutLogs?.map((workoutLog, index) => (
            <StyledTableRow key={workoutLog.id}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {timeFormat(workoutLog.timeStarted)}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {workoutLog.timeCompleted
                  ? timeFormat(workoutLog.timeCompleted)
                  : "N/A"}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {workoutLog.workoutStatus}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {workoutLog.timeCompleted
                  ? timeDuration(
                      workoutLog.timeStarted,
                      workoutLog.timeCompleted
                    )
                  : "N/A"}
              </StyledTableCell>

              <StyledTableCell align="center">
                <IconButton>
                  <KeyboardArrowDown color="primary" />
                </IconButton>
              </StyledTableCell>

              <StyledTableCell align="center">
                <IconButton
                  color="error"
                  onClick={() => handleDeleteWorkoutLog(workoutLog.id)}
                >
                  <Delete />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableCell } from "../../../component/TableComponent";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchAllWorkoutLogsByUser } from "../../../state/user/userWorkoutSlice";
import WorkoutLogTableRow from "./WorkoutLogTableRow";

export default function WorkoutLogTable() {
  const jwt = localStorage.getItem("jwt");
  const dispatch = useAppDispatch();
  const userworkout = useAppSelector((store) => store.userworkout);

  useEffect(() => {
    if (!jwt) return;
    dispatch(fetchAllWorkoutLogsByUser({ jwt }));
  }, []);

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
            <WorkoutLogTableRow
              workoutLog={workoutLog}
              workoutLogNumber={index}
              key={workoutLog.id}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

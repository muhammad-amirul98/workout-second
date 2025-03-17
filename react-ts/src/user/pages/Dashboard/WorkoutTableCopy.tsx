import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableCell } from "../../../component/TableComponent";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchAllWorkoutsByUser } from "../../../state/user/userWorkoutSlice";
import WorkoutTableRow from "./WorkoutTableRow";

export default function WorkoutTableCopy() {
  const dispatch = useAppDispatch();
  const userworkout = useAppSelector((store) => store.userworkout);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) dispatch(fetchAllWorkoutsByUser(jwt));
  }, [dispatch, jwt]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Workout Name</StyledTableCell>
            <StyledTableCell align="center">Workout Type</StyledTableCell>
            <StyledTableCell align="center">Created On</StyledTableCell>
            <StyledTableCell align="center">View Details</StyledTableCell>
            <StyledTableCell align="center">Start Workout</StyledTableCell>
            <StyledTableCell align="center">Edit/Save</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userworkout.workouts?.map((workout) => (
            <WorkoutTableRow key={workout.id} workout={workout} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

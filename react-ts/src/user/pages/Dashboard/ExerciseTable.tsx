import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchAllExercises } from "../../../state/user/userWorkoutSlice";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../component/TableComponent";
import { Delete, Edit } from "@mui/icons-material";
import { useEffect } from "react";
import { IconButton } from "@mui/material";

export default function ExerciseTable() {
  const dispatch = useAppDispatch();
  const userworkout = useAppSelector((store) => store.userworkout);

  useEffect(() => {
    dispatch(fetchAllExercises());
  }, [dispatch]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Exercise Name</StyledTableCell>
              <StyledTableCell align="center">Type</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Images</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userworkout.exercises?.map((exercise) => (
              <StyledTableRow key={exercise.id}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  className="max-w-10"
                >
                  {exercise.name}
                </StyledTableCell>
                <StyledTableCell align="center" className="max-w-10">
                  {exercise.type}
                </StyledTableCell>
                <StyledTableCell align="center" className="max-w-20">
                  {exercise.description}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <div className="flex gap-1">
                    {exercise.images?.map((image, index) => (
                      <img
                        src={image}
                        className="w-20 rounded-md"
                        key={index}
                      />
                    ))}
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

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
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

interface ExerciseTableProps {
  visibleColumns?: number[]; // Array of column indices (0, 1, 2, ...)
  onSelectExercises?: (selected: number[]) => void;
}

export default function ExerciseTable({
  visibleColumns = [0, 1, 2, 3, 4, 5],
  onSelectExercises,
}: ExerciseTableProps) {
  const dispatch = useAppDispatch();
  const userworkout = useAppSelector((store) => store.userworkout);

  useEffect(() => {
    dispatch(fetchAllExercises());
  }, [dispatch]);

  const [selected, setSelected] = useState<number[]>([]);

  const handleSelectedExercise = (exerciseId: number) => {
    const newSelected = selected.includes(exerciseId)
      ? selected.filter((id) => id !== exerciseId)
      : [...selected, exerciseId];
    setSelected(newSelected);
    onSelectExercises?.(newSelected);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {visibleColumns.includes(0) && (
                <StyledTableCell>Exercise Name</StyledTableCell>
              )}
              {visibleColumns.includes(1) && (
                <StyledTableCell align="center">Type</StyledTableCell>
              )}
              {visibleColumns.includes(2) && (
                <StyledTableCell align="center">Description</StyledTableCell>
              )}
              {visibleColumns.includes(3) && (
                <StyledTableCell align="center">Images</StyledTableCell>
              )}
              {visibleColumns.includes(4) && (
                <StyledTableCell align="center">Edit</StyledTableCell>
              )}
              {visibleColumns.includes(5) && (
                <StyledTableCell align="center">Delete</StyledTableCell>
              )}
              {visibleColumns.includes(6) && (
                <StyledTableCell align="center">Select</StyledTableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {userworkout.exercises?.map((exercise) => (
              <StyledTableRow key={exercise.id}>
                {visibleColumns.includes(0) && (
                  <StyledTableCell
                    component="th"
                    scope="row"
                    className="max-w-10"
                  >
                    {exercise.name}
                  </StyledTableCell>
                )}
                {visibleColumns.includes(1) && (
                  <StyledTableCell align="center" className="max-w-10">
                    {exercise.type}
                  </StyledTableCell>
                )}
                {visibleColumns.includes(2) && (
                  <StyledTableCell align="center" className="max-w-20">
                    {exercise.description}
                  </StyledTableCell>
                )}
                {visibleColumns.includes(3) && (
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
                )}
                {visibleColumns.includes(4) && (
                  <StyledTableCell align="center">
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                  </StyledTableCell>
                )}
                {visibleColumns.includes(5) && (
                  <StyledTableCell align="center">
                    <IconButton color="error">
                      <Delete />
                    </IconButton>
                  </StyledTableCell>
                )}
                {visibleColumns.includes(6) && (
                  <StyledTableCell align="center">
                    <IconButton
                      onClick={() => handleSelectedExercise(exercise.id)}
                    >
                      {selected.includes(exercise.id) ? (
                        <DoneIcon color="primary" />
                      ) : (
                        <DoneIcon color="error" />
                      )}
                    </IconButton>
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

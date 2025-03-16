import { useState } from "react";
import { IconButton } from "@mui/material";
import {
  Delete,
  Edit,
  KeyboardArrowDown,
  KeyboardArrowUp,
  PlayCircleOutline,
} from "@mui/icons-material";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../component/TableComponent";
import HandleDeleteDialog from "./HandleDeleteDialog";
import { useAppDispatch } from "../../../state/store";
import {
  deleteWorkout,
  fetchAllWorkoutsByUser,
} from "../../../state/user/userWorkoutSlice";
import { Workout } from "../../../types/WorkoutTypes";
import WorkoutExerciseTable from "./WorkoutExerciseTable";

export default function WorkoutTableRow({ workout }: { workout: Workout }) {
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");
  const [expandedRow, setExpandedRow] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleToggle = () => {
    setExpandedRow(!expandedRow);
  };

  const handleDelete = () => {
    if (jwt) {
      dispatch(deleteWorkout({ jwt, workoutId: workout.id }))
        .unwrap()
        .then(() => dispatch(fetchAllWorkoutsByUser(jwt)));
    }
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <StyledTableRow>
        <StyledTableCell component="th" scope="row">
          {workout.name}
        </StyledTableCell>
        <StyledTableCell align="center">{workout.type}</StyledTableCell>
        <StyledTableCell align="center">{workout.createdOn}</StyledTableCell>
        <StyledTableCell align="center">
          <IconButton color="success" onClick={handleToggle}>
            {expandedRow ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell align="center">
          <IconButton color="success">
            <PlayCircleOutline />
          </IconButton>
        </StyledTableCell>
        <StyledTableCell align="center">
          <IconButton>
            <Edit />
          </IconButton>
        </StyledTableCell>
        <StyledTableCell align="center">
          <IconButton color="error" onClick={() => setOpenDeleteDialog(true)}>
            <Delete />
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>

      {expandedRow && (
        <StyledTableRow>
          <StyledTableCell colSpan={7}>
            <WorkoutExerciseTable workout={workout} />
          </StyledTableCell>
        </StyledTableRow>
      )}
      <HandleDeleteDialog
        workoutId={workout.id}
        open={openDeleteDialog}
        handleDelete={handleDelete}
        onClose={() => setOpenDeleteDialog(false)}
      />
    </>
  );
}

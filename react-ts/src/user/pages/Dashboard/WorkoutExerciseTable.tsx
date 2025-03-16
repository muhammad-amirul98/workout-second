import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../../../state/store";
import {
  deleteWorkoutExercise,
  fetchAllWorkoutsByUser,
} from "../../../state/user/userWorkoutSlice";
import { style } from "../../../styles/styles";
import AddExerciseToWorkout from "./AddExerciseToWorkout";
import { Workout } from "../../../types/WorkoutTypes";
import WorkoutSetTable from "./WorkoutSetTable";
import React from "react";

export default function WorkoutExerciseTable({
  workout,
}: {
  workout: Workout;
}) {
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");
  const [open, setOpen] = useState(false);

  const handleDeleteExercise = (workoutExerciseId: number) => {
    if (jwt) {
      dispatch(deleteWorkoutExercise({ jwt, workoutExerciseId }))
        .unwrap()
        .then(() => dispatch(fetchAllWorkoutsByUser(jwt)));
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {workout.workoutExercises?.map((workoutExercise, index) => (
            <React.Fragment key={index}>
              <TableRow key={workoutExercise.id}>
                <TableCell align="left">
                  <div className="font-bold">
                    {workoutExercise.exercise.name}
                  </div>
                </TableCell>
                <TableCell align="right">
                  <Button
                    color="error"
                    onClick={() => handleDeleteExercise(workoutExercise.id)}
                    variant="contained"
                  >
                    Delete Exercise
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>
                  <WorkoutSetTable workoutExercise={workoutExercise} />
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
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
          <Typography id="modal-modal-title">Add Exercises</Typography>
          <AddExerciseToWorkout
            onClose={() => setOpen(false)}
            workoutId={workout.id}
          />
        </Box>
      </Modal>
    </TableContainer>
  );
}

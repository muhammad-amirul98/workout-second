import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TableCell,
  Typography,
} from "@mui/material";
import {
  Delete,
  Edit,
  KeyboardArrowDown,
  KeyboardArrowUp,
  PlayCircleOutline,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import {
  deleteWorkout,
  deleteWorkoutExercise,
  fetchAllWorkoutsByUser,
} from "../../../state/user/userWorkoutSlice";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../component/TableComponent";
import React from "react";
import { style } from "../../../styles/styles";
import AddExerciseToWorkout from "./AddExerciseToWorkout";
import HandleDeleteDialog from "./HandleDeleteDialog";

export default function WorkoutTable() {
  const dispatch = useAppDispatch();
  const userworkout = useAppSelector((store) => store.userworkout);
  const jwt = localStorage.getItem("jwt");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [workoutIdToBeDeleted, setWorkoutIdToBeDeleted] = useState<
    number | null
  >(null);

  const handleToggle = (workoutId: number) => {
    setExpandedRow((prevState) => (prevState === workoutId ? null : workoutId));
  };

  useEffect(() => {
    if (jwt) dispatch(fetchAllWorkoutsByUser(jwt));
  }, [dispatch, jwt]);

  const handleDelete = (workoutId: number) => {
    if (jwt) {
      dispatch(deleteWorkout({ jwt, workoutId }))
        .unwrap()
        .then(() => {
          if (jwt) dispatch(fetchAllWorkoutsByUser(jwt));
        });
    }
    setOpenDeleteDialog(false);
  };

  const handleDeleteExercise = (workoutExerciseId: number) => {
    if (jwt) {
      dispatch(
        deleteWorkoutExercise({
          jwt: jwt,
          workoutExerciseId: workoutExerciseId,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(fetchAllWorkoutsByUser(jwt));
        });
    }
  };

  const handleOpenDeleteDialog = (workoutId: number) => {
    setWorkoutIdToBeDeleted(workoutId);
    setOpenDeleteDialog(true);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Workout Name</StyledTableCell>
              <StyledTableCell align="center">Workout Type</StyledTableCell>
              <StyledTableCell align="center">Created On</StyledTableCell>
              <StyledTableCell align="center">View Details</StyledTableCell>

              <StyledTableCell align="center">Start Workout</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userworkout.workouts?.map((workout) => (
              <React.Fragment key={workout.id}>
                <StyledTableRow key={workout.id}>
                  <StyledTableCell component="th" scope="row">
                    {workout.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {workout.type}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {workout.createdOn}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      color="success"
                      onClick={() => handleToggle(workout.id)}
                    >
                      {expandedRow === workout.id ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
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
                    <IconButton
                      color="error"
                      onClick={() => handleOpenDeleteDialog(workout.id)}
                    >
                      <Delete />
                    </IconButton>
                  </StyledTableCell>
                  {workoutIdToBeDeleted && (
                    <HandleDeleteDialog
                      workoutId={workoutIdToBeDeleted}
                      open={openDeleteDialog}
                      handleDelete={handleDelete}
                      onClose={() => setOpenDeleteDialog(false)}
                    />
                  )}
                </StyledTableRow>
                {expandedRow === workout.id && (
                  <>
                    <StyledTableRow>
                      <StyledTableCell colSpan={7} className="space-y-3">
                        <TableContainer component={Paper}>
                          <Table style={{ tableLayout: "fixed" }}>
                            {workout.workoutExercises && (
                              <>
                                <TableHead>
                                  <StyledTableRow>
                                    <TableCell className="w-5" colSpan={1}>
                                      No.
                                    </TableCell>
                                    <TableCell align="left">
                                      Exercise Name
                                    </TableCell>
                                    <TableCell align="left">Delete</TableCell>
                                  </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                  {workout.workoutExercises?.map(
                                    (workoutExercise, index) => (
                                      <TableRow key={workoutExercise.id}>
                                        <TableCell className="w-5" colSpan={1}>
                                          {index + 1}
                                        </TableCell>
                                        <TableCell align="left">
                                          {workoutExercise.exercise.name}
                                        </TableCell>
                                        <TableCell align="left">
                                          <IconButton
                                            color="error"
                                            onClick={() => {
                                              handleDeleteExercise(
                                                workoutExercise.id
                                              );
                                            }}
                                          >
                                            <Delete />
                                          </IconButton>
                                        </TableCell>
                                      </TableRow>

                                      //
                                    )
                                  )}
                                </TableBody>
                              </>
                            )}
                          </Table>
                        </TableContainer>
                        <Button
                          variant="outlined"
                          color="primary"
                          fullWidth
                          onClick={() => handleOpen()}
                        >
                          Add Exercise
                        </Button>
                      </StyledTableCell>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography id="modal-modal-title">
                            Add Exercises
                          </Typography>
                          <AddExerciseToWorkout
                            onClose={handleClose}
                            workoutId={workout.id}
                          />
                        </Box>
                      </Modal>
                    </StyledTableRow>
                  </>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

{
  /* <TableBody>
                                {workoutExercise.workoutSets?.map(
                                  (workoutSet) => (
                                    <>
                                      <TableRow>
                                        <TableCell>Set Number</TableCell>
                                        <TableCell>Reps</TableCell>
                                        <TableCell>Weight (kg)</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>
                                          {workoutSet.setNumber}
                                        </TableCell>
                                        <TableCell>{workoutSet.reps}</TableCell>
                                        <TableCell>
                                          {workoutSet.weight}
                                        </TableCell>
                                      </TableRow>
                                    </>
                                  )
                                )}
                                <StyledTableRow>
                                  <StyledTableCell colSpan={3}>
                                    <Button
                                      variant="outlined"
                                      color="primary"
                                      fullWidth
                                    >
                                      Add Set
                                    </Button>
                                  </StyledTableCell>
                                </StyledTableRow>
                              </TableBody> */
}

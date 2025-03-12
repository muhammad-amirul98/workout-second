import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, IconButton } from "@mui/material";
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
  fetchAllWorkouts,
} from "../../../state/user/userWorkoutSlice";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../component/TableComponent";
import React from "react";

export default function WorkoutTable() {
  const dispatch = useAppDispatch();
  const userworkout = useAppSelector((store) => store.userworkout);
  const jwt = localStorage.getItem("jwt");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const handleToggle = (workoutId: number) => {
    setExpandedRow((prevState) => (prevState === workoutId ? null : workoutId));
  };

  useEffect(() => {
    dispatch(fetchAllWorkouts());
  }, [dispatch]);

  const handleDelete = (workoutId: number) => {
    if (jwt) {
      dispatch(deleteWorkout({ jwt, workoutId }))
        .unwrap()
        .then(() => {
          dispatch(fetchAllWorkouts());
        });
    }
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
                      onClick={() => handleDelete(workout.id)}
                    >
                      <Delete />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
                {expandedRow === workout.id && (
                  <>
                    <StyledTableRow>
                      <StyledTableCell colSpan={7} className="space-y-3">
                        <TableContainer component={Paper}>
                          <Table className="rounded-md">
                            <TableHead>
                              <StyledTableRow>
                                <StyledTableCell>Exercise Name</StyledTableCell>
                                <StyledTableCell>Exercise Type</StyledTableCell>
                                <StyledTableCell>
                                  Exercise Description
                                </StyledTableCell>
                                <StyledTableCell>Sets</StyledTableCell>
                                <StyledTableCell>Reps</StyledTableCell>
                                <StyledTableCell>Weight</StyledTableCell>
                              </StyledTableRow>
                            </TableHead>
                            <TableBody>
                              {[1, 1, 1, 1].map(() => (
                                <StyledTableRow>
                                  <StyledTableCell>name</StyledTableCell>
                                  <StyledTableCell>type</StyledTableCell>
                                  <StyledTableCell>desc</StyledTableCell>
                                  <StyledTableCell>sets</StyledTableCell>
                                  <StyledTableCell>reps</StyledTableCell>
                                  <StyledTableCell>weight</StyledTableCell>
                                </StyledTableRow>
                              ))}
                              {/* {workout.exercises.map((exercise) => (
                              <StyledTableRow>
                                <StyledTableCell>
                                  {exercise.name}
                                </StyledTableCell>
                                <StyledTableCell>type</StyledTableCell>
                                <StyledTableCell>desc</StyledTableCell>
                                <StyledTableCell>sets</StyledTableCell>
                                <StyledTableCell>reps</StyledTableCell>
                                <StyledTableCell>weight</StyledTableCell>
                              </StyledTableRow>
                            ))} */}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <Button variant="contained" color="primary" fullWidth>
                          Add Exercise
                        </Button>
                      </StyledTableCell>
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

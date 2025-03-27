import { useEffect, useState } from "react";
import { Alert, IconButton, Snackbar, TextField } from "@mui/material";
import {
  Delete,
  Edit,
  KeyboardArrowDown,
  KeyboardArrowUp,
  PlayCircleOutline,
  Save,
} from "@mui/icons-material";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../component/TableComponent";
import HandleDeleteDialog from "./HandleDeleteDialog";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import {
  deleteWorkout,
  fetchAllWorkoutsByUser,
  fetchCurrentWorkout,
  startWorkout,
  updateWorkout,
} from "../../../state/user/userWorkoutSlice";
import { Workout } from "../../../types/WorkoutTypes";
import WorkoutExerciseTable from "./WorkoutExerciseTable";
import { useNavigate } from "react-router-dom";

export default function WorkoutTableRow({ workout }: { workout: Workout }) {
  const dispatch = useAppDispatch();
  const userworkout = useAppSelector((store) => store.userworkout);
  const jwt = localStorage.getItem("jwt");
  const [expandedRow, setExpandedRow] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editWorkout, setEditWorkout] = useState<Workout | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [currentWorkoutSnackbarOpen, setCurrentWorkoutSnackbarOpen] =
    useState(false);

  useEffect(() => {
    if (!jwt) return;
    dispatch(fetchCurrentWorkout(jwt));
  }, []);

  const navigate = useNavigate();

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

  const handleEditWorkout = () => {
    setEditWorkout(workout);
  };

  const handleInputChange = (field: "name" | "type", value: string) => {
    if (!editWorkout) return;
    setEditWorkout({ ...editWorkout, [field]: value });
  };

  const handleSaveEditedWorkout = () => {
    if (!jwt || !editWorkout) return;

    dispatch(
      updateWorkout({
        jwt,
        workoutData: {
          name: editWorkout?.name,
          type: editWorkout?.type,
        },
        workoutId: editWorkout.id,
      })
    )
      .unwrap()
      .then(() => dispatch(fetchAllWorkoutsByUser(jwt)));
    setEditWorkout(null);
  };

  const handleStartWorkout = () => {
    if (!jwt) return;
    if (userworkout.currentWorkout) {
      setSnackbarOpen(true);
      return;
    }
    setCurrentWorkoutSnackbarOpen(true);
    // delay here
    setTimeout(() => {
      dispatch(startWorkout({ jwt, workoutId: workout.id }))
        .unwrap()
        .then(() => navigate("/dashboard/current-workout"));
    }, 1000);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCloseWorkoutSnackbar = () => {
    setCurrentWorkoutSnackbarOpen(false);
  };

  return (
    <>
      {editWorkout ? (
        <StyledTableRow>
          <StyledTableCell component="th" scope="row">
            <TextField
              variant="outlined"
              size="small"
              value={editWorkout.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </StyledTableCell>
          <StyledTableCell align="center">
            <TextField
              variant="outlined"
              size="small"
              value={editWorkout.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
            />
          </StyledTableCell>
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
            <IconButton onClick={handleSaveEditedWorkout} color="primary">
              <Save />
            </IconButton>
          </StyledTableCell>
          <StyledTableCell align="center">
            <IconButton color="error" onClick={() => setOpenDeleteDialog(true)}>
              <Delete />
            </IconButton>
          </StyledTableCell>
        </StyledTableRow>
      ) : (
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
            <IconButton color="success" onClick={handleStartWorkout}>
              <PlayCircleOutline />
            </IconButton>
            <Snackbar
              open={currentWorkoutSnackbarOpen}
              autoHideDuration={2000}
              onClose={handleCloseWorkoutSnackbar}
              message="Redirecting to current workout page..."
            ></Snackbar>
          </StyledTableCell>

          <StyledTableCell align="center">
            <IconButton onClick={handleEditWorkout}>
              <Edit />
            </IconButton>
          </StyledTableCell>
          <StyledTableCell align="center">
            <IconButton color="error" onClick={() => setOpenDeleteDialog(true)}>
              <Delete />
            </IconButton>
            {snackbarOpen && (
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <Alert
                  onClose={handleCloseSnackbar}
                  severity="error"
                  variant="filled"
                >
                  A workout is currently ongoing!
                </Alert>
              </Snackbar>
            )}
            {openDeleteDialog && (
              <HandleDeleteDialog
                workoutId={workout.id}
                open={openDeleteDialog}
                handleDelete={handleDelete}
                onClose={() => setOpenDeleteDialog(false)}
              />
            )}
          </StyledTableCell>
        </StyledTableRow>
      )}

      {expandedRow && (
        <StyledTableRow>
          <StyledTableCell colSpan={7}>
            <WorkoutExerciseTable workout={workout} />
          </StyledTableCell>
        </StyledTableRow>
      )}
    </>
  );
}

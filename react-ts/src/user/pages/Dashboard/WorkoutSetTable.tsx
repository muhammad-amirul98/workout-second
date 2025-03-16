import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  IconButton,
  Button,
  TableHead,
  TextField,
} from "@mui/material";
import { Delete, Edit, Save } from "@mui/icons-material";
import { WorkoutExercise } from "../../../types/WorkoutTypes";
import { useState } from "react";
import { useAppDispatch } from "../../../state/store";
import {
  addSetToExercise,
  deleteWorkoutSet,
  fetchAllWorkoutsByUser,
} from "../../../state/user/userWorkoutSlice";

export default function WorkoutSetTable({
  workoutExercise,
}: {
  workoutExercise: WorkoutExercise;
}) {
  const [newSet, setNewSet] = useState<{
    setNumber: string;
    plannedWeight: string;
    plannedReps: string;
  } | null>(null);
  const dispatch = useAppDispatch();

  const addNewSetRow = () => {
    setNewSet({ setNumber: "", plannedWeight: "", plannedReps: "" });
  };

  const jwt = localStorage.getItem("jwt");

  const handleSaveSet = (workoutExercise: WorkoutExercise) => {
    // Placeholder for API call
    if (jwt && newSet) {
      dispatch(
        addSetToExercise({
          jwt,
          workoutExerciseId: workoutExercise.id,
          createSetRequest: {
            setNumber: Number(newSet.setNumber),
            plannedWeight: Number(newSet.plannedWeight),
            plannedReps: Number(newSet.plannedReps),
          },
        })
      )
        .unwrap()
        .then(() => dispatch(fetchAllWorkoutsByUser(jwt)));
    }

    // Reset newSet after saving
    setNewSet(null);
  };

  const handleDeleteSet = (workoutSetId: number) => {
    if (jwt) {
      dispatch(deleteWorkoutSet({ jwt, workoutSetId: workoutSetId }))
        .unwrap()
        .then(() => dispatch(fetchAllWorkoutsByUser(jwt)));
    }
    // Placeholder for API call

    console.log("Deleting new set:", newSet);
  };

  const handleInputChange = (
    field: "setNumber" | "plannedWeight" | "plannedReps",
    value: string
  ) => {
    if (newSet) {
      setNewSet({ ...newSet, [field]: value });
    }
  };

  const handleEditSet = (workoutSetId: number) => {
    if (jwt) {
      dispatch(deleteWorkoutSet({ jwt, workoutSetId: workoutSetId }))
        .unwrap()
        .then(() => dispatch(fetchAllWorkoutsByUser(jwt)));
    }
    // Placeholder for API call

    console.log("Updating new set:", newSet);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Set Number</TableCell>
            <TableCell>Planned Weight (kg)</TableCell>
            <TableCell>Planned Reps</TableCell>
            <TableCell colSpan={2}>
              <div className="font-light">Edit/Save</div>
            </TableCell>
            <TableCell colSpan={2}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workoutExercise?.workoutSets.map((workoutSet) => (
            <TableRow key={workoutSet.id}>
              <TableCell align="left">{workoutSet.setNumber}</TableCell>
              <TableCell align="left">{workoutSet.weight}</TableCell>
              <TableCell align="left">{workoutSet.reps}</TableCell>
              <TableCell align="left" colSpan={2}>
                <IconButton
                  color="primary"
                  onClick={() => handleEditSet(workoutSet.id)}
                >
                  <Edit />
                </IconButton>
              </TableCell>

              <TableCell align="left">
                <IconButton
                  color="error"
                  onClick={() => handleDeleteSet(workoutSet.id)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {newSet && (
            <TableRow>
              <TableCell>
                <TextField
                  variant="outlined"
                  size="small"
                  value={newSet.setNumber}
                  onChange={(e) =>
                    handleInputChange("setNumber", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  size="small"
                  value={newSet.plannedWeight}
                  onChange={(e) =>
                    handleInputChange("plannedWeight", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  size="small"
                  value={newSet.plannedReps}
                  onChange={(e) =>
                    handleInputChange("plannedReps", e.target.value)
                  }
                />
              </TableCell>
              <TableCell colSpan={2}>
                <IconButton
                  onClick={() => handleSaveSet(workoutExercise)}
                  disabled={
                    !newSet.plannedReps ||
                    !newSet.setNumber ||
                    !newSet.plannedWeight
                  }
                  color="primary"
                >
                  <Save />
                </IconButton>
              </TableCell>
              <TableCell colSpan={2}>
                <IconButton onClick={() => setNewSet(null)} color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        onClick={() => addNewSetRow()}
      >
        Add Set
      </Button>
    </TableContainer>
  );
}

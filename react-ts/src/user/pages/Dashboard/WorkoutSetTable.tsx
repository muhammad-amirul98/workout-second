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
import { WorkoutExercise, WorkoutSet } from "../../../types/WorkoutTypes";
import { useState } from "react";
import { useAppDispatch } from "../../../state/store";
import {
  addSetToExercise,
  deleteWorkoutSet,
  fetchAllWorkoutsByUser,
  updateWorkoutSet,
} from "../../../state/user/userWorkoutSlice";
import { StyledTableCell } from "../../../component/TableComponent";
import React from "react";

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

  const handleInputChange = (
    field: "setNumber" | "plannedWeight" | "plannedReps",
    value: string
  ) => {
    if (newSet) {
      setNewSet({ ...newSet, [field]: value });
    }
  };

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

  const [editingSet, setEditingSet] = useState<WorkoutSet | null>(null);

  const handleEditSet = (workoutSet: WorkoutSet) => {
    setEditingSet(workoutSet);
  };

  const handleEditInputChange = (
    field: "setNumber" | "weight" | "reps",
    value: string
  ) => {
    setEditingSet((prev) => {
      if (!prev) return null;
      const updatedSet = { ...prev, [field]: value };
      return updatedSet;
    });
  };

  // useEffect(() => {
  //   // console.log(editingSet?.reps);
  //   // console.log(editingSet?.setNumber);
  //   console.log(editingSet?.weight);
  // }, [editingSet]);

  const handleSaveUpdatedSet = () => {
    if (!editingSet || !jwt) return;
    dispatch(
      updateWorkoutSet({
        jwt,
        workoutSetId: editingSet.id,
        updateWorkoutSetRequest: {
          setNumber: Number(editingSet.setNumber),
          plannedWeight: Number(editingSet.weight),
          plannedReps: Number(editingSet.reps),
        },
      })
    )
      .unwrap()
      .then(() => {
        dispatch(fetchAllWorkoutsByUser(jwt));
        setEditingSet(null);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Set Number</StyledTableCell>
            <StyledTableCell>Planned Reps</StyledTableCell>
            <StyledTableCell>Planned Weight (kg)</StyledTableCell>
            <StyledTableCell colSpan={2}>
              <div className="font-light">Edit/Save</div>
            </StyledTableCell>
            <StyledTableCell colSpan={2}>Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workoutExercise?.workoutSets.map((workoutSet, index) => (
            <React.Fragment key={workoutSet.id}>
              {editingSet && editingSet.id === workoutSet.id ? (
                <TableRow key={workoutSet.id}>
                  <TableCell>
                    {/* <TextField
                      variant="outlined"
                      size="small"
                      value={editingSet.setNumber}
                      type="number"
                      onChange={(e) =>
                        handleEditInputChange("setNumber", e.target.value)
                      }
                    /> */}
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={editingSet.reps}
                      type="number"
                      onChange={(e) =>
                        handleEditInputChange("reps", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={editingSet.weight}
                      type="number"
                      onChange={(e) =>
                        handleEditInputChange("weight", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell colSpan={2}>
                    <IconButton
                      onClick={() => handleSaveUpdatedSet()}
                      disabled={
                        !editingSet.reps ||
                        !editingSet.setNumber ||
                        !editingSet.weight
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
              ) : (
                <TableRow key={workoutSet.id}>
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell align="left">{workoutSet.reps}</TableCell>
                  <TableCell align="left">{workoutSet.weight}</TableCell>
                  <TableCell align="left" colSpan={2}>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditSet(workoutSet)}
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
              )}
            </React.Fragment>
          ))}
          {newSet && (
            <TableRow>
              <TableCell>
                {/* <TextField
                  variant="outlined"
                  size="small"
                  value={newSet.setNumber}
                  type="number"
                  onChange={(e) =>
                    handleInputChange("setNumber", e.target.value)
                  }
                /> */}
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  size="small"
                  value={newSet.plannedReps}
                  type="number"
                  onChange={(e) =>
                    handleInputChange("plannedReps", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  size="small"
                  value={newSet.plannedWeight}
                  type="number"
                  onChange={(e) =>
                    handleInputChange("plannedWeight", e.target.value)
                  }
                />
              </TableCell>
              <TableCell colSpan={2}>
                <IconButton
                  onClick={() => handleSaveSet(workoutExercise)}
                  disabled={!newSet.plannedReps || !newSet.plannedWeight}
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

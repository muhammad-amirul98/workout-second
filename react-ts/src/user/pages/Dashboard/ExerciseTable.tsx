import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useAppDispatch, useAppSelector } from "../../../state/store";
import {
  deleteExercise,
  fetchAllExercises,
  updateExercise,
} from "../../../state/user/userWorkoutSlice";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../component/TableComponent";
import { Delete, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { style } from "../../../styles/styles";
import { Exercise } from "../../../types/WorkoutTypes";

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
  const auth = useAppSelector((store) => store.auth);
  const jwt = localStorage.getItem("jwt");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllExercises());
  }, [dispatch]);

  const [selected, setSelected] = useState<number[]>([]);
  const [editExercise, setEditExercise] = useState<Exercise | null>(null);

  const handleSelectedExercise = (exerciseId: number) => {
    const newSelected = selected.includes(exerciseId)
      ? selected.filter((id) => id !== exerciseId)
      : [...selected, exerciseId];
    setSelected(newSelected);
    onSelectExercises?.(newSelected);
  };

  const handleDeleteExercise = (exerciseId: number) => {
    if (!jwt) return;
    dispatch(deleteExercise({ jwt, exerciseId }))
      .unwrap()
      .then(() => dispatch(fetchAllExercises()));
  };

  const handleOpen = (exercise: Exercise) => {
    setEditExercise(exercise);
    setOpen(true);
  };

  const handleClose = () => {
    setEditExercise(null);
    setOpen(false);
  };

  const handleInputChange = (
    field: "name" | "type" | "description",
    value: string
  ) => {
    if (!editExercise) return;
    setEditExercise({ ...editExercise, [field]: value });
  };

  const handleSaveEditedExercise = (exerciseId: number) => {
    if (!jwt || !editExercise) return;
    dispatch(
      updateExercise({
        jwt,
        exerciseData: {
          name: editExercise.name,
          type: editExercise.type,
          description: editExercise.description,
        },
        exerciseId,
      })
    )
      .unwrap()
      .then(() => dispatch(fetchAllExercises()));
    handleClose();
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
                    {exercise.userId === auth.user?.id ? (
                      <IconButton
                        color="primary"
                        onClick={() => handleOpen(exercise)}
                      >
                        <Edit />
                      </IconButton>
                    ) : null}
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography id="modal-modal-title">
                          Edit Exercise
                        </Typography>
                        <TextField
                          label="Exercise Name"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={editExercise?.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          margin="normal"
                        />
                        <TextField
                          label="Exercise Type"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={editExercise?.type}
                          onChange={(e) =>
                            handleInputChange("type", e.target.value)
                          }
                          margin="normal"
                        />
                        <TextField
                          label="Exercise Description"
                          variant="outlined"
                          size="small"
                          fullWidth
                          multiline
                          value={editExercise?.description}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                          margin="normal"
                        />
                        <div className="flex mt-2 gap-5">
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={() =>
                              handleSaveEditedExercise(exercise.id)
                            }
                          >
                            Save
                          </Button>
                          <Button
                            onClick={handleClose}
                            color="primary"
                            variant="outlined"
                          >
                            Close
                          </Button>
                        </div>
                      </Box>
                    </Modal>
                  </StyledTableCell>
                )}
                {visibleColumns.includes(5) && (
                  <StyledTableCell align="center">
                    {exercise.userId === auth.user?.id ? (
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteExercise(exercise.id)}
                      >
                        <Delete />
                      </IconButton>
                    ) : null}
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

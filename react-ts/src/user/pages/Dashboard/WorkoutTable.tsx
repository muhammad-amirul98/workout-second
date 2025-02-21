import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, IconButton, TextField } from "@mui/material";
import {
  Delete,
  Edit,
  KeyboardArrowDown,
  PlayCircleOutline,
  Save,
} from "@mui/icons-material";
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0f766e",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Define a proper Workout Data Structure
type Workout = {
  id: number;
  name: string;
  type: string;
  exercises: number;
  sets: number;
  duration: string;
  createdOn: string;
  isEditing?: boolean;
};

export default function WorkoutTable() {
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: 1,
      name: "Full Body Strength",
      type: "Strength",
      exercises: 6,
      sets: 18,
      duration: "45 min",
      createdOn: "2024-02-01",
    },
    {
      id: 2,
      name: "HIIT Cardio Blast",
      type: "Cardio",
      exercises: 8,
      sets: 16,
      duration: "30 min",
      createdOn: "2024-02-05",
    },
    {
      id: 3,
      name: "Leg Day",
      type: "Strength",
      exercises: 5,
      sets: 20,
      duration: "50 min",
      createdOn: "2024-02-10",
    },
  ]);

  const [newWorkout, setNewWorkout] = useState<Workout | null>(null);

  // Function to add an empty workout row
  const handleAddWorkout = () => {
    if (!newWorkout) {
      setNewWorkout({
        id: workouts.length + 1,
        name: "",
        type: "",
        exercises: 0,
        sets: 0,
        duration: "",
        createdOn: new Date().toISOString().split("T")[0], // Today's date
        isEditing: true,
      });
    }
  };

  // Function to save a new workout
  const handleSaveWorkout = () => {
    if (
      newWorkout &&
      newWorkout.name.trim() !== "" &&
      newWorkout.type.trim() !== ""
    ) {
      setWorkouts([...workouts, { ...newWorkout, isEditing: false }]);
      setNewWorkout(null);
    }
  };

  // Handle changes in input fields
  const handleInputChange = (field: keyof Workout, value: string | number) => {
    if (newWorkout) {
      setNewWorkout({ ...newWorkout, [field]: value });
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
              <StyledTableCell align="center">Exercises</StyledTableCell>
              <StyledTableCell align="center">Total Sets</StyledTableCell>
              <StyledTableCell align="center">
                Estimated Duration
              </StyledTableCell>
              <StyledTableCell align="center">Created On</StyledTableCell>
              <StyledTableCell align="center">View Details</StyledTableCell>

              <StyledTableCell align="center">Start Workout</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workouts.map((workout) => (
              <StyledTableRow key={workout.id}>
                <StyledTableCell component="th" scope="row">
                  {workout.name}
                </StyledTableCell>
                <StyledTableCell align="center">{workout.type}</StyledTableCell>
                <StyledTableCell align="center">
                  {workout.exercises}
                </StyledTableCell>
                <StyledTableCell align="center">{workout.sets}</StyledTableCell>
                <StyledTableCell align="center">
                  {workout.duration}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {workout.createdOn}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton color="success">
                    <KeyboardArrowDown />
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
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}

            {newWorkout && (
              <StyledTableRow>
                <StyledTableCell>
                  <TextField
                    size="small"
                    value={newWorkout.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    size="small"
                    value={newWorkout.type}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    size="small"
                    type="number"
                    value={newWorkout.exercises}
                    onChange={(e) =>
                      handleInputChange("exercises", Number(e.target.value))
                    }
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    size="small"
                    type="number"
                    value={newWorkout.sets}
                    onChange={(e) =>
                      handleInputChange("sets", Number(e.target.value))
                    }
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    size="small"
                    value={newWorkout.duration}
                    onChange={(e) =>
                      handleInputChange("duration", e.target.value)
                    }
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  {newWorkout.createdOn}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton color="success" disabled>
                    <KeyboardArrowDown />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton disabled>
                    <PlayCircleOutline />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton color="primary" onClick={handleSaveWorkout}>
                    <Save />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton color="error" onClick={() => setNewWorkout(null)}>
                    <Delete />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddWorkout}
        sx={{ mb: 2 }}
      >
        Add Workout
      </Button>
    </>
  );
}

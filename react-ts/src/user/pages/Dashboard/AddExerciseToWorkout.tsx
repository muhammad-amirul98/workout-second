import { Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ExerciseTable from "./ExerciseTable";
import { useState } from "react";
import { useAppDispatch } from "../../../state/store";
import {
  addExerciseToWorkout,
  fetchAllWorkoutsByUser,
} from "../../../state/user/userWorkoutSlice";

interface props {
  onClose: () => void;
  workoutId: number;
}

const AddExerciseToWorkout = ({ onClose, workoutId }: props) => {
  const [selected, setSelected] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");
  const handleAddExercises = async () => {
    if (jwt) {
      for (const select of selected) {
        await dispatch(
          addExerciseToWorkout({
            jwt,
            workoutId: workoutId,
            exerciseId: select,
          })
        ).unwrap();
      }
      dispatch(fetchAllWorkoutsByUser(jwt));
    }

    onClose();
  };
  return (
    <div className="h-[80vh] overflow-y-auto">
      <Grid container spacing={2}>
        <ExerciseTable
          visibleColumns={[0, 1, 6]}
          onSelectExercises={setSelected}
        />
        <Grid size={{ xs: 12 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleAddExercises()}
            disabled={selected.length === 0}
          >
            Add Selected Exercises
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddExerciseToWorkout;

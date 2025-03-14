import { WorkoutExercise } from "../../../types/WorkoutTypes";
import { Button, TableBody, TableCell, TableRow } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../component/TableComponent";

const WorkoutSet = ({
  workoutExercise,
}: {
  workoutExercise: WorkoutExercise;
}) => {
  return (
    <div>
      <TableBody>
        {workoutExercise.workoutSets?.map((workoutSet) => (
          <>
            <TableRow>
              <TableCell>Set Number</TableCell>
              <TableCell>Reps</TableCell>
              <TableCell>Weight (kg)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{workoutSet.setNumber}</TableCell>
              <TableCell>{workoutSet.reps}</TableCell>
              <TableCell>{workoutSet.weight}</TableCell>
            </TableRow>
          </>
        ))}
        <StyledTableRow>
          <StyledTableCell colSpan={3}>
            <Button variant="outlined" color="primary" fullWidth>
              Add Set
            </Button>
          </StyledTableCell>
        </StyledTableRow>
      </TableBody>
    </div>
  );
};

export default WorkoutSet;

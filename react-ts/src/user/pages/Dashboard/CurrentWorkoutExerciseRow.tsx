import { ExerciseLog } from "../../../types/WorkoutTypes";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../component/TableComponent";
import CurrentWorkoutSetRow from "./CurrentWorkoutSetRow";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const CurrentWorkoutExerciseRow = ({ exercise }: { exercise: ExerciseLog }) => {
  return (
    <>
      <StyledTableRow key={exercise.id}>
        <StyledTableCell colSpan={3}>{exercise.exercise.name}</StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell colSpan={3}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Set Number</StyledTableCell>
                  <StyledTableCell>Reps</StyledTableCell>
                  <StyledTableCell>Weight (kg)</StyledTableCell>
                  <StyledTableCell colSpan={2}>
                    <div className="font-light">Save</div>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exercise.setLogs?.map((setLog, index) => (
                  <CurrentWorkoutSetRow setLog={setLog} index={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

export default CurrentWorkoutExerciseRow;

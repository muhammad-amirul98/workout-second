import { IconButton, TableRow, TextField } from "@mui/material";
import { StyledTableCell } from "../../../component/TableComponent";
import { SetLog } from "../../../types/WorkoutTypes";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import { useAppDispatch } from "../../../state/store";
import {
  completeSetLog,
  fetchCurrentWorkout,
  uncompleteSetLog,
} from "../../../state/user/userWorkoutSlice";

const CurrentWorkoutSetRow = ({
  setLog,
  setNumber,
}: {
  setLog: SetLog;
  setNumber: number;
}) => {
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");

  const [currentSet, setCurrentSet] = useState<{
    reps: number | null;
    weight: number | null;
  }>({
    reps: setLog?.reps ?? null,
    weight: setLog?.weight ?? null,
  });

  const handleInputChange = (field: "reps" | "weight", value: number) => {
    setCurrentSet({ ...currentSet, [field]: value });
  };

  const handleCompleteSet = () => {
    if (!jwt) return;
    if (!setLog.complete) {
      dispatch(completeSetLog({ jwt, setLogId: setLog.id, req: currentSet }))
        .unwrap()
        .then(() => dispatch(fetchCurrentWorkout(jwt)));
    } else {
      dispatch(uncompleteSetLog({ jwt, setLogId: setLog.id }))
        .unwrap()
        .then(() => dispatch(fetchCurrentWorkout(jwt)));
    }
  };

  return (
    <TableRow
      sx={{
        backgroundColor: setLog.complete
          ? "rgba(0, 128, 0, 0.1)"
          : "transparent", // Green color when completeSet is true
      }}
    >
      <StyledTableCell>{setNumber}</StyledTableCell>
      <StyledTableCell>
        <TextField
          variant="outlined"
          size="small"
          value={currentSet.reps !== null ? currentSet.reps.toString() : ""}
          type="number"
          onChange={(e) => handleInputChange("reps", Number(e.target.value))}
          disabled={setLog.complete}
        />
      </StyledTableCell>

      <StyledTableCell>
        <TextField
          variant="outlined"
          size="small"
          value={currentSet.weight !== null ? currentSet.weight.toString() : ""}
          type="number"
          onChange={(e) => handleInputChange("weight", Number(e.target.value))}
          disabled={setLog.complete}
        />
      </StyledTableCell>
      <StyledTableCell></StyledTableCell>
      <StyledTableCell>
        <IconButton onClick={handleCompleteSet}>
          {setLog.complete ? (
            <CheckIcon color="primary" />
          ) : (
            <CheckIcon color="error" />
          )}
        </IconButton>
      </StyledTableCell>
    </TableRow>
  );
};

export default CurrentWorkoutSetRow;

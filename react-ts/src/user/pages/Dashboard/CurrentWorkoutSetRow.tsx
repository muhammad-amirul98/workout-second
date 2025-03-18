import { IconButton, TableRow, TextField } from "@mui/material";
import { StyledTableCell } from "../../../component/TableComponent";
import { SetLog } from "../../../types/WorkoutTypes";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";

const CurrentWorkoutSetRow = ({
  setLog,
  index,
}: {
  setLog: SetLog;
  index: number;
}) => {
  const [completeSet, setCompleteSet] = useState(false);
  const handleCompleteSet = () => {
    setCompleteSet(!completeSet);
  };

  const [currentSet, setCurrentSet] = useState<{
    reps: string;
    weight: string;
    timeCompleted: string;
  }>({
    reps: setLog?.reps?.toString() || "0",
    weight: setLog?.weight?.toString() || "0",
    timeCompleted: setLog?.timeCompleted || "",
  });

  const handleInputChange = (field: "reps" | "weight", value: number) => {
    setCurrentSet({ ...currentSet, [field]: value });
  };

  return (
    <TableRow
      sx={{
        backgroundColor: completeSet ? "rgba(0, 128, 0, 0.1)" : "transparent", // Green color when completeSet is true
      }}
    >
      <StyledTableCell>{index + 1}</StyledTableCell>
      <StyledTableCell>
        <TextField
          variant="outlined"
          size="small"
          value={currentSet.reps}
          onChange={(e) => handleInputChange("reps", Number(e.target.value))}
          disabled={completeSet}
        />
      </StyledTableCell>

      <StyledTableCell>
        <TextField
          variant="outlined"
          size="small"
          value={currentSet.weight}
          onChange={(e) => handleInputChange("weight", Number(e.target.value))}
          disabled={completeSet}
        />
      </StyledTableCell>
      <StyledTableCell>
        <IconButton onClick={handleCompleteSet}>
          {completeSet ? (
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

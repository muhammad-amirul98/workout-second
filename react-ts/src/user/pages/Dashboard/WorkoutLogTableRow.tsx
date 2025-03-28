import {
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../component/TableComponent";
import { useAppDispatch } from "../../../state/store";
import {
  deleteWorkoutLog,
  fetchAllWorkoutLogsByUser,
} from "../../../state/user/userWorkoutSlice";
import { timeDuration, timeFormat } from "../Util/dateFormat";
import { IconButton } from "@mui/material";
import { WorkoutLog } from "../../../types/WorkoutTypes";
import { useState } from "react";
import ExerciseLogTable from "./ExerciseLogTable";

export default function WorkoutLogTableRow({
  workoutLog,
  workoutLogNumber,
}: {
  workoutLog: WorkoutLog;
  workoutLogNumber: number;
}) {
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleDeleteWorkoutLog = (workoutLogId: number) => {
    if (!jwt) return;
    dispatch(deleteWorkoutLog({ jwt, workoutLogId }))
      .unwrap()
      .then(() => dispatch(fetchAllWorkoutLogsByUser({ jwt })));
  };

  const [expandedRow, setExpandedRow] = useState(false);
  const handleToggle = () => {
    setExpandedRow(!expandedRow);
  };

  return (
    <>
      <StyledTableRow key={workoutLog.id}>
        <StyledTableCell component="th" scope="row">
          {workoutLogNumber + 1}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {timeFormat(workoutLog.timeStarted)}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {workoutLog.timeCompleted
            ? timeFormat(workoutLog.timeCompleted)
            : "N/A"}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <span
            className={`font-semibold
              ${
                workoutLog.workoutStatus === "CANCELLED"
                  ? "text-red-700"
                  : workoutLog.workoutStatus === "IN_PROGRESS"
                  ? "text-blue-400 "
                  : "text-teal-700"
              }`}
          >
            {workoutLog.workoutStatus}
          </span>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {workoutLog.timeCompleted
            ? timeDuration(workoutLog.timeStarted, workoutLog.timeCompleted)
            : "N/A"}
        </StyledTableCell>

        <StyledTableCell align="center">
          <IconButton color="success" onClick={handleToggle}>
            {expandedRow ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </StyledTableCell>

        <StyledTableCell align="center">
          <IconButton
            color="error"
            onClick={() => handleDeleteWorkoutLog(workoutLog.id)}
          >
            <Delete />
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>
      {expandedRow && (
        <StyledTableRow>
          <StyledTableCell colSpan={7}>
            <ExerciseLogTable workoutLog={workoutLog} />
          </StyledTableCell>
        </StyledTableRow>
      )}
    </>
  );
}

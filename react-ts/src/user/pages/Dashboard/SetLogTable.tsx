import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
} from "@mui/material";
import { StyledTableCell } from "../../../component/TableComponent";
import { ExerciseLog } from "../../../types/WorkoutTypes";
import React from "react";
import { hourFormat } from "../Util/dateFormat";

export default function SetLogTable({
  exerciseLog,
}: {
  exerciseLog: ExerciseLog;
}) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Set Number</StyledTableCell>
            <StyledTableCell>Planned Reps</StyledTableCell>
            <StyledTableCell>Planned Weight (kg)</StyledTableCell>
            <StyledTableCell colSpan={2}>
              <div className="font-light">Time Completed</div>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exerciseLog?.setLogs.map((setLog, index) => (
            <TableRow key={setLog.id}>
              <TableCell align="left">{index + 1}</TableCell>

              <TableCell align="left">{setLog.reps}</TableCell>
              <TableCell align="left">{setLog.weight}</TableCell>
              <TableCell align="left">
                {setLog.timeCompleted ? hourFormat(setLog.timeCompleted) : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { WorkoutLog } from "../../../types/WorkoutTypes";
import React from "react";
import SetLogTable from "./SetLogTable";

export default function ExerciseLogTable({
  workoutLog,
}: {
  workoutLog: WorkoutLog;
}) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {workoutLog.exerciseLogs?.map((exerciseLog, index) => (
            <React.Fragment key={index}>
              <TableRow key={exerciseLog.id}>
                <TableCell align="left">
                  <div className="font-bold">{exerciseLog.exercise.name}</div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>
                  {/* <WorkoutSetTable workoutExercise={workoutExercise} /> */}
                  <SetLogTable exerciseLog={exerciseLog} />
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

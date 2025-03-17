import { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { style } from "../../../styles/styles";
import AddWorkout from "./AddWorkout";
import WorkoutTableCopy from "./WorkoutTableCopy";
import PlateWorkoutCalculator from "./PlateWorkoutCalculator";

const Workout = () => {
  const [open, setOpen] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCalculatorOpen = () => {
    setCalculatorOpen(true);
  };

  const handleCalculatorClose = () => {
    setCalculatorOpen(false);
  };
  return (
    <div className="space-y-3 p-5">
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={handleCalculatorOpen}
        fullWidth
      >
        Plate Calculator
      </Button>
      {/* <WorkoutTable /> */}
      <WorkoutTableCopy />
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={handleOpen}
        fullWidth
      >
        Add Workout
      </Button>

      <PlateWorkoutCalculator
        open={calculatorOpen}
        onClose={handleCalculatorClose}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title">Add New Workout</Typography>
          <AddWorkout onClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
};

export default Workout;

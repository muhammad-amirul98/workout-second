import { Box, Button, Modal, Typography } from "@mui/material";
import ExerciseTable from "./ExerciseTable";
import AddExercise from "./AddExercise";
import { useState } from "react";
import { style } from "../../../styles/styles";

const Exercise = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="space-y-3 p-5">
      <ExerciseTable />
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={handleOpen}
      >
        Add Exercise
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title">Add New Exercise</Typography>
          <AddExercise onClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
};

export default Exercise;

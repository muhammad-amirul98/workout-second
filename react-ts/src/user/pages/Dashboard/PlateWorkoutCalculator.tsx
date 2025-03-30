import { useState } from "react";
import {
  Modal,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { style } from "../../../styles/styles";

const PlateWorkoutCalculatorModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [totalWeight, setTotalWeight] = useState<number | string>("");
  const [barWeight, setBarWeight] = useState<number | string>("");
  const [plates, setPlates] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlates, setSelectedPlates] = useState<Set<number>>(new Set());

  const availablePlates = [1.25, 2.5, 5, 10, 15, 20, 25]; // Available plate sizes in kg

  const handlePlateSelection = (plate: number) => {
    setSelectedPlates((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(plate)) {
        newSelected.delete(plate);
      } else {
        newSelected.add(plate);
      }
      return newSelected;
    });
  };

  const handleCalculatePlates = () => {
    const total = Number(totalWeight);
    const bar = Number(barWeight);

    if (isNaN(total) || isNaN(bar) || total <= bar) {
      setError("Total weight must be greater than bar weight.");
      return;
    }

    const weightToLoad = (total - bar) / 2;
    let remainingWeight = weightToLoad;
    const platesNeeded: number[] = [];

    const availableSelectedPlates = Array.from(selectedPlates).sort(
      (a, b) => a - b
    );

    for (let i = availableSelectedPlates.length - 1; i >= 0; i--) {
      while (remainingWeight >= availableSelectedPlates[i]) {
        platesNeeded.push(availableSelectedPlates[i]);
        remainingWeight -= availableSelectedPlates[i];
      }
    }

    if (remainingWeight > 0) {
      setError("It is not possible to load this weight with available plates.");
      setPlates(null);
    } else {
      setError(null);
      setPlates(platesNeeded.join("kg, ") + "kg");
    }
  };

  const resetValues = () => {
    setTotalWeight("");
    setBarWeight("");
    setPlates("");
    setError("");
    setSelectedPlates(new Set());
    onClose();
  };

  return (
    <Modal open={open} onClose={resetValues}>
      <Box sx={style}>
        <Typography>Plate Workout Calculator</Typography>

        <TextField
          label="Total Weight (kg)"
          type="number"
          fullWidth
          value={totalWeight}
          onChange={(e) => setTotalWeight(e.target.value)}
          margin="normal"
        />

        <TextField
          label="Bar Weight (kg)"
          type="number"
          fullWidth
          value={barWeight}
          onChange={(e) => setBarWeight(e.target.value)}
          margin="normal"
        />

        <FormControl component="fieldset" style={{ marginTop: 20 }}>
          <Typography>Select available plates:</Typography>
          <FormGroup>
            {availablePlates.map((plate) => (
              <FormControlLabel
                key={plate}
                control={
                  <Checkbox
                    checked={selectedPlates.has(plate)}
                    onChange={() => handlePlateSelection(plate)}
                    name={`plate-${plate}`}
                  />
                }
                label={`${plate} kg`}
              />
            ))}
          </FormGroup>
        </FormControl>

        {error && <Typography color="error">{error}</Typography>}

        {plates && (
          <Typography>Plates needed for each side: {plates}</Typography>
        )}

        <div className="flex mt-2 gap-5">
          <Button
            onClick={handleCalculatePlates}
            color="primary"
            variant="contained"
            disabled={!barWeight || !totalWeight}
          >
            Calculate
          </Button>
          <Button onClick={onClose} color="primary" variant="outlined">
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default PlateWorkoutCalculatorModal;

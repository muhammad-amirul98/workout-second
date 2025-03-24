import { Button, Divider, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { addHeightAndWeight } from "../../../state/user/userWorkoutSlice";

const BodyMeasurements = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const dispatch = useAppDispatch();
  const userworkout = useAppSelector((store) => store.userworkout);
  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(event.target.value);
  };
  const jwt = localStorage.getItem("jwt");

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!jwt) return;
    dispatch(
      addHeightAndWeight({
        jwt,
        req: {
          height: Number(height),
          weight: Number(weight),
        },
      })
    );
  };

  return (
    <div className="flex flex-col items-center space-y-5">
      <div className="pr-5">
        <h2 className="logo text-2xl">Body Measurements</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="p-5 flex flex-col items-center space-y-5"
      >
        <div className="p-5 flex items-center bg-slate-50 rounded-md space-x-2">
          <div className="w-15">Height</div>
          <Divider orientation="vertical" flexItem />
          <div className="ml-5">
            <TextField
              fullWidth
              id="height"
              name="height"
              label="Height (CM)"
              type="number"
              onChange={handleHeightChange}
              required
            />
          </div>
        </div>
        <div className="p-5 flex items-center bg-slate-50 rounded-md space-x-2">
          <div className="w-15">Weight</div>
          <Divider orientation="vertical" flexItem />
          <div className="ml-5">
            <TextField
              fullWidth
              id="Weight"
              name="Weight"
              label="Weight (KG)"
              type="number"
              inputProps={{ step: "0.1" }}
              onChange={handleWeightChange}
              required
            />
          </div>
        </div>

        <div>
          <Button type="submit" variant="contained">
            Save Measurements
          </Button>
        </div>
      </form>
      <div className="space-y-5">
        <div className="p-5 flex items-center bg-slate-50 rounded-md">
          <div className="w-15">Current BMI</div>
          <Divider orientation="vertical" flexItem />
          <p className="ml-5">{userworkout.bodyMeasurement?.bmi}</p>
        </div>
        <div className="p-5 flex items-center bg-slate-50 rounded-md">
          <div className="w-15">BMI Status</div>
          <Divider orientation="vertical" flexItem />
          <p className="ml-5">{userworkout.bodyMeasurement?.bmiStatus}</p>
        </div>
      </div>
    </div>
  );
};

export default BodyMeasurements;

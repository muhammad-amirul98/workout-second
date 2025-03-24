import { Divider, TextField } from "@mui/material";
import React from "react";

const BodyMeasurementsRow = ({ measurement }: { measurement: string }) => {
  return (
    <div className="p-5 flex items-center bg-slate-50 rounded-md">
      <div className="w-15">{measurement}</div>
      <Divider orientation="vertical" flexItem />
      <p className="ml-5">
        <TextField
          fullWidth
          id={measurement}
          name={measurement}
          label={measurement}
          required
        />
      </p>
    </div>
  );
};

export default BodyMeasurementsRow;

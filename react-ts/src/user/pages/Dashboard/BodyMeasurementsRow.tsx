import { IconButton, TableRow, TextField } from "@mui/material";
import { StyledTableCell } from "../../../component/TableComponent";
import { BodyMeasurement } from "../../../types/WorkoutTypes";
import { dateFormat } from "../Util/dateFormat";
import { Delete, Edit, Save } from "@mui/icons-material";
import { useState } from "react";
import { useAppDispatch } from "../../../state/store";
import {
  deleteBodyMeasurement,
  fetchUserBodyMeasurements,
  updateBodyMeasurement,
} from "../../../state/user/userWorkoutSlice";

const BodyMeasurementsRow = ({
  bodyMeasurement,
}: {
  bodyMeasurement: BodyMeasurement;
}) => {
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");
  const getBmiColor = (status: string) => {
    switch (status) {
      case "UNDERWEIGHT":
        return "blue";
      case "NORMAL_WEIGHT":
        return "green";
      case "OVERWEIGHT":
        return "orange";
      case "OBESE":
        return "red";
      default:
        return "black";
    }
  };

  const [editRow, setEditRow] = useState<{
    weight: number;
    height: number;
  } | null>(null);

  const handleEditRow = () => {
    setEditRow({
      weight: bodyMeasurement.weight,
      height: bodyMeasurement.height,
    });
  };

  const handleInputChange = (field: "weight" | "height", value: number) => {
    if (!editRow) return;
    setEditRow({ ...editRow, [field]: value });
  };

  const handleSaveRow = () => {
    if (!jwt || !editRow) return;
    dispatch(
      updateBodyMeasurement({
        jwt,
        req: {
          height: editRow.height,
          weight: editRow.weight,
        },
        id: bodyMeasurement.id,
      })
    )
      .unwrap()
      .then(() => dispatch(fetchUserBodyMeasurements(jwt)));
    setEditRow(null);
  };

  const handleDeleteRow = () => {
    if (!jwt) return;
    dispatch(deleteBodyMeasurement({ jwt, id: bodyMeasurement.id }))
      .unwrap()
      .then(() => dispatch(fetchUserBodyMeasurements(jwt)));
  };
  return (
    <TableRow key={bodyMeasurement.id}>
      <StyledTableCell>
        {editRow ? (
          <TextField
            variant="outlined"
            size="small"
            value={editRow.height}
            type="number"
            onChange={(e) =>
              handleInputChange("height", Number(e.target.value))
            }
            sx={{ width: "100px" }}
          />
        ) : (
          bodyMeasurement.height
        )}
      </StyledTableCell>
      <StyledTableCell>
        {editRow ? (
          <TextField
            variant="outlined"
            size="small"
            value={editRow.weight}
            type="number"
            onChange={(e) =>
              handleInputChange("weight", Number(e.target.value))
            }
            sx={{ width: "100px" }}
          />
        ) : (
          bodyMeasurement.weight
        )}
      </StyledTableCell>
      <StyledTableCell>{bodyMeasurement.bmi.toFixed(2)}</StyledTableCell>
      <StyledTableCell
        style={{ color: getBmiColor(bodyMeasurement.bmiStatus) }}
      >
        {bodyMeasurement.bmiStatus}
      </StyledTableCell>
      <StyledTableCell>
        {dateFormat(bodyMeasurement.dateRecorded)}
      </StyledTableCell>
      <StyledTableCell color="primary">
        {editRow ? (
          <IconButton onClick={handleSaveRow} color="primary">
            <Save />
          </IconButton>
        ) : (
          <IconButton onClick={handleEditRow} color="primary">
            <Edit />
          </IconButton>
        )}
      </StyledTableCell>
      <StyledTableCell>
        <IconButton color="error" onClick={handleDeleteRow}>
          <Delete />
        </IconButton>
      </StyledTableCell>
    </TableRow>
  );
};

export default BodyMeasurementsRow;

import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { StyledTableCell } from "../../../component/TableComponent";
import { Delete, Save } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import {
  addHeightAndWeight,
  fetchUserBodyMeasurements,
} from "../../../state/user/userWorkoutSlice";
import BodyMeasurementsRow from "./BodyMeasurementsRow";

const BodyMeasurementsTable = () => {
  const [newRow, setNewRow] = useState<{
    weight: number;
    height: number;
  } | null>(null);

  const jwt = localStorage.getItem("jwt");
  const userworkout = useAppSelector((store) => store.userworkout);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!jwt) return;
    dispatch(fetchUserBodyMeasurements(jwt));
  }, []);

  const handleAddNewRow = () => {
    setNewRow({ weight: 0, height: 0 });
  };

  const handleInputChange = (field: "weight" | "height", value: number) => {
    if (!newRow) return;
    setNewRow({ ...newRow, [field]: value });
  };

  const saveNewRow = () => {
    if (!jwt || !newRow) return;
    dispatch(
      addHeightAndWeight({
        jwt,
        req: {
          height: newRow.height,
          weight: newRow.weight,
        },
      })
    )
      .unwrap()
      .then(() => dispatch(fetchUserBodyMeasurements(jwt)));
    setNewRow(null);
  };

  return (
    <div className="space-y-3">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Height(CM)</StyledTableCell>
              <StyledTableCell>Weight(KG)</StyledTableCell>
              <StyledTableCell>BMI</StyledTableCell>
              <StyledTableCell>BMI Status</StyledTableCell>
              <StyledTableCell>Date Recorded</StyledTableCell>
              <StyledTableCell>Edit/Save</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userworkout.bodyMeasurements?.map((bodyMeasurement, index) => (
              <BodyMeasurementsRow
                bodyMeasurement={bodyMeasurement}
                key={index}
              />
            ))}
            {newRow && (
              <TableRow>
                <StyledTableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={newRow.height}
                    type="number"
                    onChange={(e) =>
                      handleInputChange("height", Number(e.target.value))
                    }
                    sx={{ width: "100px" }}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={newRow.weight}
                    type="number"
                    onChange={(e) =>
                      handleInputChange("weight", Number(e.target.value))
                    }
                    sx={{ width: "100px" }}
                  />
                </StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>
                  <IconButton color="primary" onClick={saveNewRow}>
                    <Save />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={handleAddNewRow}
        fullWidth
      >
        Add Measurements
      </Button>
    </div>
  );
};

export default BodyMeasurementsTable;

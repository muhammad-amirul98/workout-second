import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../../state/store";
import {
  addWorkout,
  fetchAllWorkouts,
} from "../../../state/user/userWorkoutSlice";
import { Button, TextField } from "@mui/material";

const AddWorkout = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      type: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      if (jwt) {
        dispatch(addWorkout({ jwt, workoutData: values }))
          .unwrap()
          .then(() => {
            dispatch(fetchAllWorkouts());
          });
        console.log("Form submitted with values:", values);
        onClose();
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-4 p-4">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Workout Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              id="type"
              name="type"
              label="Workout type"
              multiline
              rows={4}
              value={formik.values.type}
              onChange={formik.handleChange}
              error={formik.touched.type && Boolean(formik.errors.type)}
              helperText={formik.touched.type && formik.errors.type}
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Add Workout
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddWorkout;

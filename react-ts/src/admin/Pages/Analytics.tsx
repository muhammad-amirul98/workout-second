import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import { Box, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import * as Yup from "yup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

const Analytics = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      date: null as Dayjs | null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      date: Yup.date().nullable().required("Date is required"),
    }),
    onSubmit: (values) => {
      console.log({
        ...values,
        date: values.date ? values.date.format("YYYY-MM-DD") : null, // Format the date before submitting
      });
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold pb-5 text-teal-700">Create</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          component={"form"}
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        ></Box>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <DatePicker
              sx={{ width: "100%" }}
              name="date"
              label="Select Date"
              value={formik.values.date}
              onChange={(newValue) => formik.setFieldValue("date", newValue)}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button fullWidth variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </div>
  );
};

export default Analytics;

import { Box, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../../state/store";
// import { createOrder } from "../../../state/user/orderSlice";
import { createAddress } from "../../../state/user/userSlice";

const AddressFormSchema = Yup.object().shape({
  zip: Yup.string()
    .matches(/^[0-9]{5,6}$/, "Invalid ZIP code")
    .required("ZIP code is required"),
  country: Yup.string().required("Country is required"),
  street: Yup.string()
    .min(10, "Street address must be at least 10 characters")
    .required("Street address is required"),
});

interface AddressFormProps {
  paymentGateway: string;
  onSubmit: () => void; // Callback prop for parent to close modal
}

const AddressForm = ({ paymentGateway, onSubmit }: AddressFormProps) => {
  const jwt = localStorage.getItem("jwt");
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      zip: "",
      street: "",
      country: "",
    },
    validationSchema: AddressFormSchema,
    onSubmit: (values) => {
      console.log(values);
      console.log(jwt);
      console.log(paymentGateway);
      if (jwt) {
        dispatch(createAddress({ address: values, jwt }))
          .then(() => {
            // After dispatching successfully, close the modal
            onSubmit(); // Call the parent callback to close the modal
          })
          .catch((error) => {
            console.error("Error adding address:", error);
          });
      }
    },
  });

  return (
    <Box sx={{ max: "auto" }}>
      <p className="text-xl text-center pb-5">Address Details:</p>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="country"
              label="Country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="street"
              label="Street"
              value={formik.values.street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.street && Boolean(formik.errors.street)}
              helperText={formik.touched.street && formik.errors.street}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="zip"
              label="Zip"
              value={formik.values.zip}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.zip && Boolean(formik.errors.zip)}
              helperText={formik.touched.zip && formik.errors.zip}
            />
          </Grid>
        </Grid>
        <Box sx={{ textAlign: "center", pt: 2 }}>
          <Button type="submit" variant="contained" fullWidth>
            Add Address
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddressForm;

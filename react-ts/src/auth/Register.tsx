import { useState } from "react";
import { useAppDispatch } from "../state/store";
import { useNavigate } from "react-router-dom";
import { sendOtp, signIn } from "../state/AuthSlice";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";

const Register = () => {
  const dispatch = useAppDispatch();
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      fullname: "",
    },
    validate: (values) => {
      const errors: { email?: string; otp?: string; fullname?: string } = {};

      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.otp) {
        errors.otp = "OTP is required";
      } else if (values.otp.length !== 6) {
        errors.otp = "OTP must be 6 digits";
      }

      if (!values.fullname) {
        errors.fullname = "Full name is required";
      }

      return errors;
    },
    onSubmit: (values) => {
      dispatch(signIn(values));
      navigate("/account/profile");
      console.log("Form submitted:", values);
    },
  });

  const handleSendOtp = async () => {
    setLoading(true); // Start loading

    try {
      await dispatch(sendOtp(formik.values.email)).unwrap();
      setOtpSent(true); // Set OTP as sent only if the function completes successfully
    } catch (error) {
      console.error("Failed to send OTP:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex justify-center items-center p-3">
      <div className="space-y-3 w-2xs">
        <h1 className="text-center font-bold text-xl text-teal-700">
          Register
        </h1>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          {otpSent && (
            <div>
              <div className="space-y-2">
                <p className="m-3 font-medium text-sm opacity-60">
                  Enter OTP sent to your email:
                </p>
                <TextField
                  className="mb-3"
                  fullWidth
                  name="otp"
                  label="OTP"
                  value={formik.values.otp}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.otp && Boolean(formik.errors.otp)}
                  helperText={formik.touched.otp && formik.errors.otp}
                />
              </div>

              <TextField
                className="mt-3"
                fullWidth
                name="fullname"
                label="Full Name"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.fullname && Boolean(formik.errors.fullname)
                }
                helperText={formik.touched.fullname && formik.errors.fullname}
              />
            </div>
          )}
          <div className="mt-3">
            {otpSent ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ py: "11px" }}
              >
                Login
              </Button>
            ) : (
              <Button
                onClick={handleSendOtp}
                fullWidth
                variant="contained"
                sx={{ py: "11px" }}
                disabled={loading} // Disable button while loading
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Register"
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

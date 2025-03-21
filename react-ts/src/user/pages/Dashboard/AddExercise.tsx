import { AddPhotoAlternate } from "@mui/icons-material";
import { Button, CircularProgress, IconButton, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";
import { useState } from "react";
import { uploadToCloudinary } from "../Util/uploadToCloudinary";
import { useAppDispatch } from "../../../state/store";
import {
  addExercise,
  fetchAllExercises,
} from "../../../state/user/userWorkoutSlice";
import * as Yup from "yup";

const AddExercise = ({ onClose }: { onClose: () => void }) => {
  const [uploadImage, setUploadImage] = useState(false);
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      description: "",
      images: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      type: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      if (jwt) {
        dispatch(addExercise({ jwt, exerciseData: values }))
          .unwrap()
          .then(() => dispatch(fetchAllExercises()));
        onClose();
      }
    },
  });

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    setUploadImage(true);
    if (file) {
      const image = await uploadToCloudinary(file);
      formik.setFieldValue("images", [...formik.values.images, image]);
    }

    setUploadImage(false);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-4 p-4">
        <Grid container spacing={2}>
          <Grid className="flex flex-wrap gap-5" size={{ xs: 12 }}>
            <input
              type="file"
              accept="image/"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="fileInput" className="relative">
              <span className="w-24 h-24 cursor-pointer flex items-center justify-center">
                <AddPhotoAlternate className="text-gray-700" />
              </span>

              {uploadImage && (
                <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                  <CircularProgress />
                </div>
              )}
            </label>
            <div className="flex flex-wrap gap-2">
              {formik.values.images.map((image, index) => (
                <div className="relative" key={index}>
                  <img src={image} className="w-24 h-24 object-cover" />
                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    size="small"
                    color="error"
                    sx={{ position: "absolute", top: 0, right: 0 }}
                  >
                    X
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Exercise Name"
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
              label="Exercise Type"
              value={formik.values.type}
              onChange={formik.handleChange}
              error={formik.touched.type && Boolean(formik.errors.type)}
              helperText={formik.touched.type && formik.errors.type}
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Exercise Description"
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Add Exercise
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddExercise;

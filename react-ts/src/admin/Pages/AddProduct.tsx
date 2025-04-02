import { useFormik } from "formik";
import { useState } from "react";
import { uploadToCloudinary } from "../../user/pages/Util/uploadToCloudinary";
import Grid from "@mui/material/Grid2";
import { AddPhotoAlternate } from "@mui/icons-material";
import { Button, CircularProgress, IconButton, TextField } from "@mui/material";
import { useAppDispatch } from "../../state/store";
import { createProduct } from "../../state/admin/ProductSlice";

const AddProduct = ({ onClose }: { onClose: () => void }) => {
  const [uploadImage, setUploadImage] = useState(false);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      brand: "",
      price: 0,
      stock: 0,
      images: [],
    },
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      const jwt = localStorage.getItem("jwt");

      if (jwt) {
        dispatch(createProduct({ request: values, jwt }));
        onClose();
      } else {
        console.error("JWT is missing");
        // Handle the case where JWT is null
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
              label="Name"
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
              id="description"
              name="description"
              label="Description"
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
          <Grid size={{ xs: 4 }}>
            <TextField
              fullWidth
              id="brand"
              name="brand"
              label="Brand"
              multiline
              value={formik.values.brand}
              onChange={formik.handleChange}
              error={formik.touched.brand && Boolean(formik.errors.brand)}
              helperText={formik.touched.brand && formik.errors.brand}
              required
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <TextField
              fullWidth
              id="price"
              name="price"
              label="Price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              required
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <TextField
              fullWidth
              id="stock"
              name="stock"
              label="Stock"
              type="number"
              value={formik.values.stock}
              onChange={formik.handleChange}
              error={formik.touched.stock && Boolean(formik.errors.stock)}
              helperText={formik.touched.stock && formik.errors.stock}
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Add Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddProduct;

import { Box, Button, Modal, Typography } from "@mui/material";
import ProductsTable from "./ProductsTable";
import AddProduct from "./AddProduct";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const Products = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="space-y-3">
        <ProductsTable />
        <Button variant="contained" onClick={handleOpen}>
          Add Product
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title">Add New Product</Typography>
            <AddProduct onClose={handleClose} />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Products;

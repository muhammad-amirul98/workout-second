import ProductsTable from "./ProductsTable";
import { Button } from "@mui/material";

const Products = () => {
  return (
    <div>
      <div className="space-y-3">
        <ProductsTable />
        <Button variant="contained">Add Product</Button>
      </div>
    </div>
  );
};

export default Products;

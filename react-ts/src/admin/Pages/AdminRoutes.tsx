import { Route, Routes } from "react-router-dom";
import AdminTable from "./AdminTable";
import GridTable from "./HomePage/GridTable";
import Products from "./Products";
import Orders from "./Orders";
import Analytics from "./Analytics";
import HomeCategoryTable from "./HomePage/HomeCategoryTable";
import Tabs from "./Tabs";

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/users" element={<AdminTable />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/home-page" element={<HomeCategoryTable />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/reports" element={<GridTable />} />
        <Route path="/community" element={<Tabs />} />
      </Routes>
    </div>
  );
};

export default AdminRoutes;

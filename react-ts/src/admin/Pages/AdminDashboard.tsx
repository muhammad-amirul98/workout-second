import AdminRoutes from "./AdminRoutes";
import AdminSidebarList from "./AdminSidebarList";

const AdminDashboard = () => {
  const toggleList = () => {};

  return (
    <div>
      <div className="lg:flex lg:h-[90vh]">
        <section className="hidden lg:block h-full">
          <AdminSidebarList toggleList={toggleList} />
        </section>
        <section className="p-10 w-full lg:w-[80%] overflow-y-auto">
          <AdminRoutes />
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;

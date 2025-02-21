import DashboardRoutes from "../Routes/DashboardRoutes";
import SideBarList from "./SideBarList";

const Dashboard = () => {
  const toggleList = () => {};
  return (
    <div>
      <div className="lg:flex lg:h-[90vh]">
        <section className="hidden lg:block h-full">
          <SideBarList toggleList={toggleList} />
        </section>
        <section className="p-10 w-full lg:w-[80%] overflow-y-auto">
          <DashboardRoutes />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

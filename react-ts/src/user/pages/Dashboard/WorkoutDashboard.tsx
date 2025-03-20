import WorkoutProgress from "./WorkoutProgress";
import WorkoutCountChart from "./WorkoutCountChart";

const WorkoutDashboard = () => {
  return (
    <div className="flex flex-col items-center space-y-10 ">
      <h2 className="logo text-2xl font-bold">Workout Progress Charts</h2>
      <WorkoutProgress />
      <WorkoutCountChart />
    </div>
  );
};

export default WorkoutDashboard;

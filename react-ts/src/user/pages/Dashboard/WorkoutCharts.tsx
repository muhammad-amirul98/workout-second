import BodyMeasurementChart from "./BodyMeasurementChart";
import WorkoutCountChart from "./WorkoutCountChart";
import WorkoutMaxWeightChart from "./WorkoutMaxWeightChart";
import WorkoutVolumeChart from "./WorkoutVolumeChart";

const WorkoutCharts = () => {
  return (
    <div className="flex flex-col items-center space-y-10 ">
      <h2 className="logo text-2xl font-bold">Workout Progress Charts</h2>
      <WorkoutVolumeChart />
      <WorkoutCountChart />
      <WorkoutMaxWeightChart />
      <BodyMeasurementChart />
    </div>
  );
};

export default WorkoutCharts;

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchUserBodyMeasurements } from "../../../state/user/userWorkoutSlice";
import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { CSVLink } from "react-csv";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { Tooltip as MuiTooltip, IconButton } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import html2canvas from "html2canvas";

const BodyMeasurementChart = () => {
  const userworkout = useAppSelector((store) => store.userworkout);
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");
  const chartRef = useRef<HTMLDivElement | null>(null);

  //REAL DATA
  useEffect(() => {
    if (!jwt) return;
    dispatch(fetchUserBodyMeasurements(jwt));
  }, []);

  const formattedData =
    userworkout.bodyMeasurements?.map((measurement) => ({
      date: new Date(measurement.dateRecorded).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      weight: measurement.weight,
      height: measurement.height,
      bmi: measurement.bmi,
    })) || [];

  //CUSTOM TOOL TIP

  const customToolTip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const { date, weight, height, bmi } = payload[0].payload;

      return (
        <div className="bg-white p-2 border rounded shadow-md">
          <p className="text-sm font-semibold text-gray-700">📅 Date: {date}</p>
          {payload.map((entry) => (
            <div>
              <p
                key={entry.dataKey}
                className="text-md font-bold"
                style={{ color: entry.color }}
              >
                {entry.dataKey === "weight" && `🏋️‍♂️ Weight: ${weight} KG`}
                {entry.dataKey === "height" && `📏 Height: ${height} CM`}
                {entry.dataKey === "bmi" && `📊 BMI: ${bmi}`}
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const downloadChartAsImage = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        const imageUrl = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = "workout_maxweight.png";
        link.click();
      });
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full">
        <h2 className="secondary-text text-xl">Body Measurements</h2>
        <div className="flex items-center">
          <MuiTooltip title="Export to CSV" arrow>
            <span>
              <CSVLink
                data={formattedData}
                filename={`body-measurement-chart.csv`}
              >
                <IconButton color="primary" size="small">
                  <AssessmentIcon />
                </IconButton>
              </CSVLink>
            </span>
          </MuiTooltip>

          <MuiTooltip title="Download chart image" arrow>
            <span>
              <IconButton
                color="primary"
                onClick={() => {
                  if (chartRef.current) {
                    downloadChartAsImage();
                  }
                }}
              >
                <ImageIcon />
              </IconButton>
            </span>
          </MuiTooltip>
        </div>
      </div>

      <div className="w-full p-5" ref={chartRef}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            height={1000}
            // data={chartData}
            data={formattedData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={customToolTip} />
            <Legend />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#FF5733"
              dot={{ r: 2 }}
              name="Weight (KG)"
            />
            <Line
              type="monotone"
              dataKey="height"
              stroke="#33A1FF"
              dot={{ r: 2 }}
              name="Height (CM)"
            />
            <Line
              type="monotone"
              dataKey="bmi"
              stroke="#28A745"
              dot={{ r: 2 }}
              name="BMI"
            />

            <Brush dataKey="date" height={30} stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BodyMeasurementChart;

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  TooltipProps,
} from "recharts";
import { Tooltip as MuiTooltip, IconButton } from "@mui/material";
import { CSVLink } from "react-csv";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ImageIcon from "@mui/icons-material/Image";
import html2canvas from "html2canvas";
import { ReactNode, useRef } from "react";
import {
  MaxWeight,
  WorkoutCount,
  WorkoutVolume,
} from "../../../types/WorkoutTypes";

interface ChartTemplateProps {
  data: WorkoutCount[] | WorkoutVolume[] | MaxWeight[];
  chartTitle: string;
  dataKey: string;
  downloadFileName: string;
  xAxisKey: string;
  chartType: "workoutVolume" | "workoutCount" | "maxWeight"; // Adjust according to chart type
  customToolTip?: (props: TooltipProps<number, string>) => ReactNode;
}

const LineChartTemplate = ({
  data,
  chartTitle,
  dataKey,
  downloadFileName,
  xAxisKey,
  chartType,
  customToolTip,
}: ChartTemplateProps) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  const downloadChartAsImage = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        // Create an image URL from the canvas
        const imageUrl = canvas.toDataURL("image/png");

        // Create a temporary anchor element to trigger the download
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = `${downloadFileName}.png`; // Set the default filename
        link.click(); // Trigger the download
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center space-y-10">
      <div className="flex items-center justify-between w-full">
        <h2 className="secondary-text text-xl">{chartTitle}</h2>
        <div className="flex items-center">
          <MuiTooltip title="Export to CSV" arrow>
            <span>
              <CSVLink data={data} filename={`${downloadFileName}.csv`}>
                <IconButton color="primary" size="small">
                  <AssessmentIcon />
                </IconButton>
              </CSVLink>
            </span>
          </MuiTooltip>

          <MuiTooltip title="Download chart image" arrow>
            <span>
              <IconButton color="primary" onClick={downloadChartAsImage}>
                <ImageIcon />
              </IconButton>
            </span>
          </MuiTooltip>
        </div>
      </div>

      <div className="w-full p-5" ref={chartRef}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            {chartType === "workoutCount" && (
              <CartesianGrid strokeDasharray="3 3" />
            )}
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip content={customToolTip} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartTemplate;

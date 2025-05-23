import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import {
  LayoutDashboard,
  Dumbbell,
  ClipboardList,
  BarChart,
  LineChart,
  ShoppingCart,
  Package,
  Brain,
} from "lucide-react";

export const menu = [
  {
    name: "Current Workout",
    path: "/dashboard/current-workout",
    icon: <LayoutDashboard className="text-teal-600" />,
    activeIcon: <LayoutDashboard className="text-white" />,
  },
  {
    name: "Workouts",
    path: "/dashboard/workouts",
    icon: <Dumbbell className="text-teal-600" />,
    activeIcon: <Dumbbell className="text-white" />,
  },
  {
    name: "Workout Logs",
    path: "/dashboard/workout-logs",
    icon: <ClipboardList className="text-teal-600" />,
    activeIcon: <ClipboardList className="text-white" />,
  },
  {
    name: "Body Measurements",
    path: "/dashboard/bm",
    icon: <BarChart className="text-teal-600" />,
    activeIcon: <BarChart className="text-white" />,
  },
  {
    name: "Progress",
    path: "/dashboard/progress",
    icon: <LineChart className="text-teal-600" />,
    activeIcon: <LineChart className="text-white" />,
  },
  {
    name: "Exercises",
    path: "/dashboard/exercise",
    icon: <DirectionsRunIcon className="text-teal-600" />,
    activeIcon: <DirectionsRunIcon className="text-white" />,
  },
  {
    name: "Shop",
    path: "/dashboard/shop",
    icon: <ShoppingCart className="text-teal-600" />,
    activeIcon: <ShoppingCart className="text-white" />,
  },
  {
    name: "Orders",
    path: "/dashboard/orders",
    icon: <Package className="text-teal-600" />,
    activeIcon: <Package className="text-white" />,
  },
  {
    name: "AI Chatbot",
    path: "/dashboard/ai-chatbot",
    icon: <Brain className="text-teal-600" />,
    activeIcon: <Brain className="text-white" />,
  },
];

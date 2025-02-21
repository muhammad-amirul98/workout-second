import {
  LayoutDashboard,
  Dumbbell,
  ClipboardList,
  BarChart,
  LineChart,
  Trophy,
  MessageSquare,
  ShoppingCart,
  Package,
  Brain,
  Settings,
} from "lucide-react";

export const menu = [
  {
    name: "Dashboard",
    path: "/dashboard",
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
    name: "1RMs",
    path: "/dashboard/1rms",
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
    name: "Challenges",
    path: "/dashboard/challenges",
    icon: <Trophy className="text-teal-600" />,
    activeIcon: <Trophy className="text-white" />,
  },
  {
    name: "Community",
    path: "/dashboard/community",
    icon: <MessageSquare className="text-teal-600" />,
    activeIcon: <MessageSquare className="text-white" />,
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
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: <Settings className="text-teal-600" />,
    activeIcon: <Settings className="text-white" />,
  },
];

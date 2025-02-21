import {
  LayoutDashboard,
  Users,
  Package,
  ClipboardList,
  BarChart,
  LineChart,
  MessageSquare,
  Settings,
  ShieldCheck,
  Server,
  Brain,
  Home,
} from "lucide-react";

export const adminMenu = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard className="text-teal-600" />,
    activeIcon: <LayoutDashboard className="text-white" />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <Users className="text-teal-600" />,
    activeIcon: <Users className="text-white" />,
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: <ClipboardList className="text-teal-600" />,
    activeIcon: <ClipboardList className="text-white" />,
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: <Package className="text-teal-600" />,
    activeIcon: <Package className="text-white" />,
  },

  {
    name: "Analytics",
    path: "/admin/analytics",
    icon: <BarChart className="text-teal-600" />,
    activeIcon: <BarChart className="text-white" />,
  },
  {
    name: "Reports",
    path: "/admin/reports",
    icon: <LineChart className="text-teal-600" />,
    activeIcon: <LineChart className="text-white" />,
  },
  {
    name: "Home Page",
    path: "/admin/home-page",
    icon: <Home className="text-teal-600" />,
    activeIcon: <Home className="text-white" />,
  },
  {
    name: "Community Moderation",
    path: "/admin/community",
    icon: <MessageSquare className="text-teal-600" />,
    activeIcon: <MessageSquare className="text-white" />,
  },
  {
    name: "System Settings",
    path: "/admin/system-settings",
    icon: <Settings className="text-teal-600" />,
    activeIcon: <Settings className="text-white" />,
  },
  {
    name: "Security & Permissions",
    path: "/admin/security",
    icon: <ShieldCheck className="text-teal-600" />,
    activeIcon: <ShieldCheck className="text-white" />,
  },
  {
    name: "Server Status",
    path: "/admin/server",
    icon: <Server className="text-teal-600" />,
    activeIcon: <Server className="text-white" />,
  },
  {
    name: "AI Chatbot Settings",
    path: "/admin/ai-chatbot-settings",
    icon: <Brain className="text-teal-600" />,
    activeIcon: <Brain className="text-white" />,
  },
];

export const orderStatuses = [
  {
    status: "PENDING",
    title: "Pending",
    description: "Order has been placed but not yet processed.",
    color: "#FFA500", // Orange color
  },
  {
    status: "PROCESSING",
    title: "Processing",
    description: "Order is being prepared and packed.",
    color: "#FFCC00", // Yellow color
  },
  {
    status: "SHIPPED",
    title: "Shipped",
    description: "Order has been shipped and is on its way.",
    color: "#0000FF", // Blue color
  },
  {
    status: "DELIVERED",
    title: "Delivered",
    description: "Order has been successfully delivered.",
    color: "#28A745", // Green color
  },
  {
    status: "CANCELLED",
    title: "Cancelled",
    description: "Order was cancelled by the user or admin.",
    color: "#DC3545", // Red color
  },
  {
    status: "REFUNDED",
    title: "Refunded",
    description: "Order has been refunded to the user.",
    color: "#6C757D", // Grey color
  },
  {
    status: "FAILED",
    title: "Payment Failed",
    description: "Payment was unsuccessful, order not processed.",
    color: "#DC3545", // Red color
  },
  {
    status: "RETURN_REQUESTED",
    title: "Return Requested",
    description: "User has requested a return for the order.",
    color: "#FFC107", // Amber color
  },
  {
    status: "RETURNED",
    title: "Returned",
    description: "Order has been returned and processed.",
    color: "#17A2B8", // Teal color
  },
];

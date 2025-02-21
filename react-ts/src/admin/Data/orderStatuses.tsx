export const orderStatuses = [
  {
    status: "PENDING",
    title: "Pending",
    description: "Order has been placed but not yet processed.",
  },
  {
    status: "PROCESSING",
    title: "Processing",
    description: "Order is being prepared and packed.",
  },
  {
    status: "SHIPPED",
    title: "Shipped",
    description: "Order has been shipped and is on its way.",
  },
  {
    status: "DELIVERED",
    title: "Delivered",
    description: "Order has been successfully delivered.",
  },
  {
    status: "CANCELLED",
    title: "Cancelled",
    description: "Order was cancelled by the user or admin.",
  },
  {
    status: "REFUNDED",
    title: "Refunded",
    description: "Order has been refunded to the user.",
  },
  {
    status: "FAILED",
    title: "Payment Failed",
    description: "Payment was unsuccessful, order not processed.",
  },
  {
    status: "RETURN_REQUESTED",
    title: "Return Requested",
    description: "User has requested a return for the order.",
  },
  {
    status: "RETURNED",
    title: "Returned",
    description: "Order has been returned and processed.",
  },
];

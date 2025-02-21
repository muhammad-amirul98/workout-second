export const accountStatuses = [
  {
    status: "PENDING_VERIFICATION",
    title: "Pending Verification",
    description: "Awaiting email or phone verification.",
  },
  {
    status: "ACTIVE",
    title: "Active",
    description: "Account is fully verified and in good standing.",
  },
  {
    status: "SUSPENDED",
    title: "Suspended",
    description:
      "Account is temporarily disabled due to policy violations or security concerns.",
  },
  {
    status: "BANNED",
    title: "Banned",
    description: "Account has been permanently restricted due to violations.",
  },
  {
    status: "DEACTIVATED",
    title: "Deactivated",
    description: "User has voluntarily deactivated their account.",
  },
  {
    status: "CLOSED",
    title: "Closed",
    description: "Account has been permanently closed by the user or admin.",
  },
];

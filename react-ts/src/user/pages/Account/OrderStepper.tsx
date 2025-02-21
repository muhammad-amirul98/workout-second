import { CheckCircle, FiberManualRecord } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const steps = [
  {
    name: "Order Placed",
    description: "Your order has been placed.",
    date: "Mon, Feb 10, 2025",
    value: "PLACED",
  },
  {
    name: "Packed",
    description: "Your order is packed and ready to ship.",
    date: "Tue, Feb 11, 2025",
    value: "PACKED",
  },
  {
    name: "Shipping",
    description: "Your order is on its way.",
    date: "Thu, Feb 13, 2025",
    value: "SHIPPING",
  },
  {
    name: "Arrived",
    description: "Your order has arrived at its destination.",
    date: "Sat, Feb 15, 2025",
    value: "ARRIVED",
  },
];

const canceledSteps = [
  {
    name: "Order Placed",
    description: "Your order has been placed.",
    date: "Mon, Feb 10, 2025",
    value: "PLACED",
  },
  {
    name: "Cancelled",
    description: "Your order has been cancelled.",
    date: "Tue, Feb 11, 2025",
    value: "CANCELLED",
  },
];

const currentStep = 2;

const OrderStepper = ({ orderStatus }: { orderStatus: string }) => {
  const [statusStep, setStatusStep] = useState(steps);

  useEffect(() => {
    if (orderStatus === "CANCELLED") {
      setStatusStep(canceledSteps);
    } else {
      setStatusStep(steps);
    }
  }, [orderStatus]);

  return (
    <Box className="mx-auto my-10">
      {statusStep.map((step, index) => (
        <>
          <div key={index} className="flex px-4">
            <div className="flex flex-col items-center">
              <Box
                sx={{ zIndex: -1 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 
                    ${
                      index <= currentStep
                        ? "bg-gray-200 text-teal-600"
                        : "bg-gray-300 text-gray-600"
                    }`}
              >
                {step.value === orderStatus ? (
                  <CheckCircle />
                ) : (
                  <FiberManualRecord sx={{ zIndex: -1 }} />
                )}
              </Box>
              {index < statusStep.length - 1 && (
                <div
                  className={`border h-20 w-[2px] ${
                    index < currentStep
                      ? " text-teal-500"
                      : "bg-gray-300 text-gray-600"
                  }`}
                ></div>
              )}
            </div>
            <div className="ml-2 w-full">
              <div
                className={`${
                  step.value === orderStatus
                    ? "bg-teal-600 p-2 text-white font-medium rounded-md -translate-y-3"
                    : ""
                }
                ${
                  orderStatus === "CANCELLED" && step.value === orderStatus
                    ? "bg-red-500"
                    : ""
                } w-full`}
              >
                <p className="">
                  {step.name}: {step.date}
                </p>
                <p
                  className={`${
                    step.value === orderStatus
                      ? "text-gray-200"
                      : "text-gray-500"
                  } text-xs`}
                >
                  {step.description}
                </p>
                {/* <p
                  className={`${
                    step.value === orderStatus
                      ? "text-gray-200"
                      : "text-gray-500"
                  } text-xs`}
                >
                  {step.date}
                </p> */}
              </div>
            </div>
          </div>
        </>
      ))}
    </Box>
  );
};

export default OrderStepper;

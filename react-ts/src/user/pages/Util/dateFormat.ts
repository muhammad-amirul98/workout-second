import { format } from "date-fns";

export const dateFormat = (deliverDate: string) => {
  // Convert the ISO string into a JavaScript Date object
  const date = new Date(deliverDate);

  // Format the date to "DD-MM-YYYY, Day"
  const formattedDate = format(date, "dd MMMM yyyy, EEEE");
  return formattedDate;
};

export const timeFormat = (deliverDate: string) => {
  // Convert the ISO string into a JavaScript Date object
  const date = new Date(deliverDate);

  // Format the date to "DD-MM-YYYY, Day"
  const formattedDate = format(date, "dd MMMM yyyy, EEEE hh:mm:ss a");
  return formattedDate;
};

export const timeDuration = (startTime: string, endTime: string) => {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  // Get the difference in milliseconds
  const diffInMilliseconds = endDate.getTime() - startDate.getTime();

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor(
    (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

  // Return the result as a string
  return `${hours}h ${minutes}m ${seconds}s`;
};

export const hourFormat = (deliverDate: string) => {
  // Convert the ISO string into a JavaScript Date object
  const date = new Date(deliverDate);

  // Format the date to "DD-MM-YYYY, Day"
  const formattedDate = format(date, "hh:mm:ss a");
  return formattedDate;
};

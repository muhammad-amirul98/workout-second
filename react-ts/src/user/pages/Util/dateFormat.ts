import { format } from "date-fns";

export const dateFormat = (deliverDate: string) => {
  // Convert the ISO string into a JavaScript Date object
  const date = new Date(deliverDate);

  // Format the date to "DD-MM-YYYY, Day"
  const formattedDate = format(date, "dd MMMM yyyy, EEEE");
  return formattedDate;
};

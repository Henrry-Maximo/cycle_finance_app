import dayjs from "dayjs";

export const today = dayjs().format("YYYY-MM-DDTHH:mm:ss");
export const firstDayMonth = dayjs()
  .startOf("month")
  .format("YYYY-MM-DDTHH:mm:ss");

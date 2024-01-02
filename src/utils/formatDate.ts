export const formatDate = (startTime: Date | null, endTime: Date | null) => {
  if (!startTime || !endTime) return "";
  const startTimeString = new Date(startTime);
  const endTimeString = new Date(endTime);

  const startDate = `${startTimeString.getFullYear()}.${(
    startTimeString.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${startTimeString
    .getDate()
    .toString()
    .padStart(2, "0")}`;
  const startTimeFormatted = `${startTimeString
    .getHours()
    .toString()
    .padStart(2, "0")}:${startTimeString
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  const endTimeFormatted = `${endTimeString
    .getHours()
    .toString()
    .padStart(2, "0")}:${endTimeString
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  return `${startDate} ${startTimeFormatted} ~ ${endTimeFormatted}`;
};

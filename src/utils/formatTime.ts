export const formatTime = (milliseconds: number) => {
  const seconds = Math.floor(milliseconds / 1000);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // 시, 분, 초 중 0이 아닌 부분만 표시
  const formattedTime =
    (hours > 0 ? `${hours}시간 ` : "") +
    (minutes > 0 ? `${minutes}분 ` : "") +
    `${remainingSeconds}초`;
  return formattedTime;
};

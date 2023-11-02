export const numberToTwoString = (data: number) => {
  if (data < 10) return `0${data}`;
  else return `${data}`;
};

export const calculatePace = (timeInSeconds: number): string => {
  const paceMinutes: number = Math.floor(timeInSeconds / 60);
  const paceSeconds: number = Math.round(timeInSeconds % 60);

  return `${paceMinutes}' ${paceSeconds}''`;
};

export const secondToHourMinuteSeconds = (data: number) => {
  const hours = Math.floor(data / 3600); // 시간 계산
  const minutes = Math.floor((data % 3600) / 60); // 분 계산
  const seconds = data % 60; // 초 계산

  return `${numberToTwoString(hours)}:${numberToTwoString(
    minutes,
  )}:${numberToTwoString(seconds)}`;
};

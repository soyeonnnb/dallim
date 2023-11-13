export const numberToTwoString = (data: number) => {
  if (data < 10) return `0${data}`;
  else return `${data}`;
};

export const calculatePace = (
  timeInSeconds: number,
  meters: number = 1000,
): string => {
  // 초당 몇미터 ?
  const metersPerSecond = meters / timeInSeconds;
  // 1km를 가는 데에 걸리는 초
  const secondsPerKilometer = 1000 / metersPerSecond;
  const paceMinutes: number = Math.floor(secondsPerKilometer / 60);
  const paceSeconds: number = Math.round(secondsPerKilometer % 60);

  return `${paceMinutes}' ${paceSeconds}''`;
};

export const secondToMinuteSeconds = (data: number) => {
  const minutes = Math.floor(data / 60); // 분 계산
  const seconds = Math.round(data % 60); // 초 계산

  return `${numberToTwoString(minutes)}:${numberToTwoString(seconds)}`;
};

export const secondToMinuteText = (time: number) => {
  const minutes = Math.floor(time / 60); // 분 계산
  const seconds = Math.round(time % 60); // 초 계산
  if (time >= 60) {
    return `${minutes}분 ${seconds}초`;
  } else {
    return `${seconds}초`;
  }
};

export const meterToKMOrMeter = (meter: number, fixed: number = 1) => {
  if (meter >= 1000) return `${(meter / 1000).toFixed(fixed)}km`;
  else return `${Math.floor(meter)}m`;
};

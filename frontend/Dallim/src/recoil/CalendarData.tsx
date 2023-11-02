export const getDateObject = (date: string) => {
  // 날짜와 시간의 각 부분을 직접 자릅니다.
  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(5, 7));
  const day = Number(date.slice(8, 10));
  const hour = Number(date.slice(11, 13));
  const minute = Number(date.slice(14, 16));
  const second = Number(date.slice(17, 19));
  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
  };
};

// Calendar 라이브러리 Object 형식
// 각 캐릭터의 정보를 나타내는 타입
export type CalendarType = {
  dateString: string; // string타입의 데이터
  day: number; // 일
  month: number; // 월
  timestamp: number; // 시간. 숫자 타입
  year: number; // 년
};

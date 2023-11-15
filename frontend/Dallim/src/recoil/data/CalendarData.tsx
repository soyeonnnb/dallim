export const getDateObject = (data: string) => {
  const dateObject = new Date(data);
  const dayList = ['일', '월', '화', '수', '목', '금', '토'];

  // 날짜와 시간의 각 부분을 직접 자릅니다.
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const date = dateObject.getDate();
  const hour = dateObject.getHours();
  const minute = dateObject.getMinutes();
  const second = dateObject.getSeconds();
  const day = dayList[dateObject.getDay()];
  return {
    year,
    month,
    date,
    hour,
    minute,
    second,
    day,
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

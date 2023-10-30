// 현재 날짜를 가져오는 함수
export const getCurrentDate = () => {
  const now = new Date();
  return now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
};

// Calendar 라이브러리 Object 형식
// 각 캐릭터의 정보를 나타내는 타입
export type CalendarType = {
  dateString?: string;
  day?: number;
  month?: number;
  timestamp?: number;
  year?: number;
};

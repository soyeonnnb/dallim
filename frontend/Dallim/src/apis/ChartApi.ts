import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export interface RunningRecord {
  id: number; // 기록 ID
  location: string; // 기록 위치
  type: string; // 기록 타입
  totalTime: number; // 기록 걸린 시간
  totalDistance: number; // 기록 거리
  averageSpeed: number; // 기록 평균 거리
  createdAt: string; // 기록 시간
  isRegistration: boolean; // ??
}

export interface MonthlyRecords {
  year: number; // 년도
  month: number; // 월
  runningMateNickname: string; // 한달간 가장 많이 함께한 러닝메이트의 유저 닉네임
  runningMateCharacter: number; // 사용자가 지정한 캐릭터 번호
  runningMateLevel: number; // 사용자의 캐릭터 레벨
  totalCount: number; // 달린 횟수
  totalDistance: number; // 달린 총 거리(M 단위)
  totalTime: number; // 달린 총 시간(분 단위)
  records: RunningRecord[]; // 기록들 리스트
}
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    return token;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};

const BASE_URL = 'https://k9b208.p.ssafy.io';

// 차트 내 달력 데이터
export const fetchUserCalendarChart = async () => {
  const accessToken = await getToken();
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/running/me/all`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('ChartApi : 월별 조회 Axios 실패 --> ', error); // 로깅을 추가합니다.
    throw error;
  }
};

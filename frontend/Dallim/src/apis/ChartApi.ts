import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface DailyRecord {
  id: string;
  location: string; // 출발 위치
  distance: number; // 거리
  hour: number; // 출발 기준 시
  minute: number; // 출발 기준 분
  time: number; // 얼마나 걸렸는지 (시간)
  type: 'PAIR' | 'ALONE'; // 혼자 달린건지
}

// 월별에서 사용
export interface RunningRecord {
  id: string; // 기록 ID
  location: string; // 기록 위치
  type: 'PAIR' | 'ALONE'; // 기록 타입
  watchOrMobile: 'WATCH' | 'MOBILE';
  totalTime: number; // 기록 걸린 시간
  totalDistance: number; // 기록 거리
  averageSpeed: number; // 기록 평균 속력
  createdAt: string; // 기록 시간
}

export interface MonthlyRecords {
  year: number; // 년도
  month: number; // 월
  runningMateNickName: string; // 한달간 가장 많이 함께한 러닝메이트의 유저 닉네임
  runningMateCharacterIndex: number; // 사용자가 지정한 캐릭터 번호
  evolutionStage: number;
  runningMateLevel: number; // 사용자의 캐릭터 레벨
  totalCount: number; // 달린 횟수
  totalDistance: number; // 달린 총 거리(M 단위)
  totalTime: number; // 달린 총 시간(분 단위)
  records: RunningRecord[]; // 기록들 리스트
}

export interface RunningRecordData {
  second: number; // second는 0부터 시작(순차적으로)
  heartRate: number;
  distance: number; // 그 때의 누적 거리
  speed: number; // 그 때의 속력
  pace: number; // 그 때의 초당 페이스
}

export interface RunningRecordDataPace {
  averagePace: number; // 전체 페이스
  maxPace: number; // 최대 페이스(구간에서 최대값 뽑아오면 될듯)
  section: {
    startTime: number; // 해당 페이스 시작 시간(초 단위)
    finishTime: number; // 해당 페이스 끝 시간(초 단위)
    pace: number; // 해당 구간 기준 페이스(초 단위)
  }[];
}

// 기본 레코드 데이터를 위한 인터페이스
interface BasicRecord {
  id: string;
  location: string;
  type: 'PAIR' | 'ALONE';
  createdAt: string;
  totalDistance: number;
  totalTime: number;
  runningRecordInfos: RunningRecordData[];
  pace: RunningRecordDataPace;
}

// RecordDetail에서 BasicRecord 인터페이스 확장
export interface RecordDetail extends BasicRecord {
  distancePerSpeed: number[];
  watchOrMobile: 'WATCH' | 'MOBILE';
  winOrLose: 'WIN' | 'LOSE' | 'GIVEUP';
  heartRate: {
    averageHeartRate: number;
    maxHeartRate: number;
    secondPerHeartRateSection: number[];
  };
  rivalRecord?: RivalRecord;
}

// 라이벌 레코드 데이터를 위한 인터페이스, BasicRecord를 확장하고 추가적인 사용자 및 캐릭터 정보 포함
export interface RivalRecord extends BasicRecord {
  user: {
    userId: number;
    nickname: string;
    point: number;
    level: number;
  };
  character: {
    characterId: number | null;
    characterIndex: number;
    planetIndex: number;
    level: number;
    exp: number;
    evolutionStage: number;
  };
}

export interface PaceChartDataType {
  value: number; // speed
  second: number;
  fromZeroPace: string;
  distance: number;
}

export interface PaceSectionType {
  startTime: number;
  finishTime: number;
  pace: number;
}

export interface HeartChartDataType {
  value: number;
  second: number;
}

export interface PaceDataType {
  chartData: PaceChartDataType[];
  sectionPace: PaceSectionType[];
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

// 러닝 데이터 상세 가져오기
export const fetchDetailRunningData = async (id: string) => {
  const accessToken = await getToken();
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/running/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('ChartApi : 러닝 데이터 상세 조회 Axios 실패 --> ', error); // 로깅을 추가합니다.
    throw error;
  }
};

// 러닝메이트와 달렸던 기록 가져오기
export const fetchRunningMateRunningList = async (id: string) => {
  const accessToken = await getToken();
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/running-record/running-mate/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.error(
      'ChartApi : 러닝메이트와 달렸던 기록 리스트 조회 Axios 실패 --> ',
      error,
    ); // 로깅을 추가합니다.
    throw error;
  }
};

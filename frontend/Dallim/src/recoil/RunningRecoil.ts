// RunningRecoil.ts
import {atom} from 'recoil';

export interface Competitor {
  runningMateId: string;
  runningRecordId: string;
  userId: number;
  nickName: string;
  characterIndex: number;
  evolutionStage: number;
  planetIndex: number;
  level: number;
  averagePace: number;
  totalDistance: number;
  totalTime: number;
  createdAt: string;
  clear: boolean;
}

export const competitorDataState = atom<Competitor[]>({
  key: 'competitorDataState',
  default: [],
});

///////////////////////////////////////////////////////

interface LocationData {
  second: number; // 필요
  latitude: number;
  longitude: number;
  distance: number; // 필요
  speed: number; // 필요
  pace: number; // 필요
}

export const runningSessionState = atom({
  key: 'runningSessionState',
  default: {
    initLatitude: 0, // 시작 위도
    initLongitude: 0, // 시작 경도
    watchOrMobile: 'MOBILE',
    userId: 0,
    characterId: 0,
    type: 'ALONE',
    rivalRecord: null,
    runningRecordInfos: [] as LocationData[],
    totalTime: 0,
    totalDistance: 0,
    averageSpeed: 0,
    createdAt: new Date().toISOString(),
  },
});

// 타이머의 경과 시간 추적
export const secondsElapsedState = atom<number>({
  key: 'secondsElapsedState',
  default: 0,
});

// 시작 상태인지 여부
export const isRunningState = atom<boolean>({
  key: 'isRunningState',
  default: false,
});

// 이동한 총 거리를 추적
export const totalDistanceState = atom<number>({
  key: 'totalDistanceState',
  default: 0,
});

// 인터페이스에 표시될 거리를 관리
export const displayDistanceState = atom<number>({
  key: 'displayDistanceState',
  default: 0,
});

interface Position {
  latitude: number;
  longitude: number;
}

export const lastPositionState = atom<Position | null>({
  key: 'lastPositionState',
  default: null,
});

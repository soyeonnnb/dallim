import {atom} from 'recoil';

// Friend 타입을 정의합니다.
export type Friend = {
  userId: number;
  characterIndex: number;
  nickname: string;
  level: number;
};

// 친구 목록 상태를 저장할 atom을 생성합니다.
export const friendsState = atom<Friend[]>({
  key: 'friendsState', // 고유한 key 값
  default: [], // 초기 상태 값 : 빈 배열
});

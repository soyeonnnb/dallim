// RunningRecoil.ts
import { atom } from 'recoil';

export interface Competitor {
  id: string;
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

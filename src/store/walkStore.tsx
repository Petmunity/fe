import { produce } from "immer";
import { create } from "zustand";

type Position = {
  lat: number;
  lng: number;
};
interface WalkStore {
  center: Position;
  startPosition: Position;
  endPosition: Position;
  startTime: Date | null;
  endTime: Date | null;
  totalTime: number;
  totalDistance: number;
  path: Position[];
  setStartTime: (startTime: Date | null) => void;
  setEndTime: (endTime: Date | null) => void;
  setCenter: (center: Position) => void;
  setStartPosition: (startPosition: Position) => void;
  setEndPosition: (endPosition: Position) => void;
  setTotalTime: (totalTime: number) => void;
  setPath: (pathUpdateFunction: (prevPath: Position[]) => Position[]) => void;
  setTotalDistance: (
    distanceUpdateFunction: (prevDistance: number) => number,
  ) => void;
  resetStore: () => void; // 추가: 스토어를 초기값으로 리셋하는 함수
}

const initialState = {
  center: { lat: 0, lng: 0 },
  startPosition: { lat: 0, lng: 0 },
  endPosition: { lat: 0, lng: 0 },
  startTime: null,
  endTime: null,
  totalDistance: 0,
  path: [],
  totalTime: 0,
};

export const useWalkStore = create<WalkStore>((set) => ({
  center: { lat: 0, lng: 0 },
  startPosition: { lat: 0, lng: 0 },
  endPosition: { lat: 0, lng: 0 },
  startTime: null,
  endTime: null,
  totalDistance: 0,
  path: [],
  totalTime: 0,
  setStartTime: (startTime: Date | null) => set({ startTime }),
  setEndTime: (endTime: Date | null) => set({ endTime }),
  setCenter: (center: Position) => set({ center }),
  setStartPosition: (startPosition: Position) => set({ startPosition }),
  setEndPosition: (endPosition: Position) => set({ endPosition }),
  setTotalDistance: (
    distanceUpdateFunction: (prevDistance: number) => number,
  ) =>
    set(
      produce((state) => {
        state.totalDistance = distanceUpdateFunction(state.totalDistance);
      }),
    ),
  setPath: (pathUpdateFunction: (prevPath: Position[]) => Position[]) =>
    set(
      produce((state) => {
        state.path = pathUpdateFunction(state.path);
      }),
    ),
  setTotalTime: (totalTime: number) => set({ totalTime }),
  resetStore: () => set({ ...initialState }),
}));

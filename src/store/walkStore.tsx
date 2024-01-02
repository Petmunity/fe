import { create } from "zustand";

type Position = {
  lat: number;
  lng: number;
};
interface WalkStore {
  center: Position;
  endPosition: Position;
  startTime: Date | null;
  endTime: Date | null;
  totalTime: number;
  totalDistance: number;
  path: Position[];
  setStartTime: (startTime: Date | null) => void;
  setEndTime: (endTime: Date | null) => void;
  setCenter: (center: Position) => void;
  setEndPosition: (endPosition: Position) => void;
  setTotalTime: (totalTime: number) => void;
  setPath: (pathUpdateFunction: (prevPath: Position[]) => Position[]) => void;
  setTotalDistance: (
    distanceUpdateFunction: (prevDistance: number) => number,
  ) => void;
}

export const useWalkStore = create<WalkStore>((set) => ({
  center: { lat: 0, lng: 0 },
  endPosition: { lat: 0, lng: 0 },
  startTime: null,
  endTime: null,
  totalDistance: 0,
  path: [],
  totalTime: 0,
  setStartTime: (startTime: Date | null) => set({ startTime }),
  setEndTime: (endTime: Date | null) => set({ endTime }),
  setCenter: (center: Position) => set({ center }),
  setEndPosition: (endPosition: Position) => set({ endPosition }),
  setTotalDistance: (
    distanceUpdateFunction: (prevDistance: number) => number,
  ) =>
    set((state) => ({
      totalDistance: distanceUpdateFunction(state.totalDistance),
    })),
  setPath: (pathUpdateFunction: (prevPath: Position[]) => Position[]) =>
    set((state) => ({ path: pathUpdateFunction(state.path) })),
  setTotalTime: (totalTime: number) => set({ totalTime }),
}));

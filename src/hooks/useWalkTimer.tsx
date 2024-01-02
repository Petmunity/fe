import { useState, useEffect } from "react";

export const useWalkTimer = (start: boolean) => {
  const [walkTime, setWalkTime] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  useEffect(() => {
    if (start) {
      const id = window.setInterval(() => {
        setWalkTime((prevTime) => prevTime + 1);
      }, 1000);
      setIntervalId(id);
    } else {
      if (intervalId !== null) window.clearInterval(intervalId);
      setIntervalId(null);
      setWalkTime(0);
    }

    return () => {
      if (intervalId !== null) window.clearInterval(intervalId);
    };
  }, [start]);

  return walkTime;
};

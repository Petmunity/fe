"use client";
import { useState, useEffect } from "react";
import Map from "@/components/walk/Map";
import Header from "@/components/common/Header";

export default function WalkStartPage() {
  const [countdown, setCountdown] = useState(5);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      // 매 초마다 countdown을 감소시키는 타이머를 설정합니다.
      const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setShowMap(true);
    }
  }, [countdown]);

  return (
    <div>
      {showMap ? (
        <main className="h-screen">
          <Header title="산책" />
          <Map />
        </main>
      ) : (
        <div
          className="h-screen flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/walking-loading.png')" }}
        >
          <div className="gap-y-2 flex flex-col items-center mb-20 rounded-md p-3">
            <span className="font-medium text-white">산책을 곧 시작해요!</span>
            <h1 className="text-4xl font-semibold text-white">{countdown}</h1>
          </div>
        </div>
      )}
    </div>
  );
}

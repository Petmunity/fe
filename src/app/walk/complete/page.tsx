"use client";
import { useWalkStore } from "@/store/store";
import Header from "@/components/common/Header";
import { formatTime, formatDate } from "@/utils";
import Link from "next/link";
import Lottie from "lottie-react";
import dog from "./dog.json";
import { useEffect } from "react";

export default function CompletePage() {
  const { center, endPosition, endTime, startTime, totalDistance, totalTime } =
    useWalkStore();
  //TODO: 산책결과 백엔드에 전달하는 API 연동해야함.

  useEffect(() => {
    // 현재 URL을 히스토리에 추가
    window.history.pushState(null, document.title, window.location.href);

    // 뒤로 가기 버튼이 눌렸을 때 현재 페이지로 이동
    window.onpopstate = () => {
      window.history.go(1);
    };
    // 새로 고침 시 알림 메세지 뜨게
    window.onbeforeunload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    return () => {
      window.onpopstate = null;
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header title="산책완료" />
        <main className="p-4 space-y-5 flex flex-col">
          <h1 className="text-2xl text-primary font-semibold">산책 완료!</h1>
          <div className="flex justify-between text-lg font-medium">
            <span>{formatDate(startTime, endTime)}</span>
          </div>
          <div className="flex justify-between">
            <div>
              <h1>산책시간</h1>
              <h1>{formatTime(totalTime)}</h1>
            </div>
            <div>
              <h1>산책거리</h1>
              <h1>{totalDistance}km</h1>
            </div>
          </div>
        </main>
        <div className="flex justify-center mt-32">
          <div className="w-52 h-52">
            <Lottie animationData={dog} />
          </div>
        </div>
      </div>
      <section id="CTA" className="sticky bottom-0 bg-white px-5 pb-4">
        <Link href="/" className="button-violet">
          산책종료
        </Link>
      </section>
    </>
  );
}

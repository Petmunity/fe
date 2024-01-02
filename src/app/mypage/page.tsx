"use client";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import BottomSheet from "@/components/common/Sheet";
import { useBottomSheet } from "@hooks/useBottomSheet";

export default function Mypage() {
  const { isOpen, openSheet, closeSheet } = useBottomSheet();

  return (
    <div className="flex min-h-screen flex-col">
      <Header title="마이페이지" />
      <h1>Mypage</h1>
      <button onClick={openSheet}>ddd</button>
      <BottomSheet className="" isOpen={isOpen} closeSheet={closeSheet}>
        <div className="gap-y-3 flex flex-col p-5 bg-purple-50">
          <button className="border-b rounded-md border-primary-100">
            1번 시트 버튼
          </button>
          <button className="border-b rounded-md border-primary-100">
            2번 시트 버튼
          </button>
          <button
            onClick={closeSheet}
            className="border-b rounded-md border-primary-100"
          >
            닫기
          </button>
        </div>
      </BottomSheet>
      <Navbar />
    </div>
  );
}

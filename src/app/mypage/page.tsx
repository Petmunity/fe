"use client";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import BottomSheet from "@/components/common/Sheet";
import { useBottomSheet } from "@hooks/useBottomSheet";
import Link from "next/link";

export default function Mypage() {
  const { isOpen, openSheet, closeSheet } = useBottomSheet();

  return (
    <div className="flex min-h-screen flex-col">
      <Header title="마이페이지" />
      <main className="flex flex-col">
        <div className="flex flex-col items-center bg-gray-50">
          <Link href="/petinfo" className="p-4 w-full border-b-2">
            우리 아이 정보 바꾸기
          </Link>
          <Link href="/" className="p-4 w-full border-b-2">
            다이어리 초대하기
          </Link>
          <Link href="/" className="p-4 w-full border-b-2">
            알림 설정
          </Link>
          <Link href="/" className="p-4 w-full border-b-2">
            로그아웃
          </Link>
          <Link href="/" className="p-4 w-full">
            회원 탈퇴
          </Link>
        </div>
      </main>
      <button onClick={openSheet}>시트열기</button>
      <BottomSheet isOpen={isOpen} closeSheet={closeSheet}>
        <div className="gap-y-3 flex flex-col p-5">
          <button className="border-b rounded-md">1번 시트 버튼</button>
          <button className="border-b rounded-md border-gray-200">
            2번 시트 버튼
          </button>
          <button
            onClick={closeSheet}
            className="border-b rounded-md border-gray-200"
          >
            닫기
          </button>
        </div>
      </BottomSheet>
      <Navbar />
    </div>
  );
}

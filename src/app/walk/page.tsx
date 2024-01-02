import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import IntroMap from "@/components/walk/IntroMap";
import Link from "next/link";

export default function WalkPage() {
  return (
    <div className="flex min-h-screen flex-col relative">
      <Header title="산책" />
      <main className="space-y-3">
        <div className="p-4">
          <IntroMap />
        </div>
        <div className="h-1.5 bg-gray-100" />
        <div className="p-4">
          <div className="space-y-3">
            <h1 className="text-lg font-semibold">최근 산책 기록</h1>
            <div className="flex flex-col border border-gray-200  bg-primary-100 rounded-md p-3 text-sm font-medium ">
              <span>2023-12-20</span>
              <span>오후 1시 30분 ~ 오후 1시 55분</span>
              <span>1.5km</span>
            </div>
            <div className="flex flex-col border border-gray-200  bg-primary-100 rounded-md p-3 text-sm font-medium ">
              <span>2023-12-20</span>
              <span>오후 1시 30분 ~ 오후 1시 55분</span>
              <span>1.5km</span>
            </div>
            <div className="flex flex-col border border-gray-200  bg-primary-100 rounded-md p-3 text-sm font-medium ">
              <span>2023-12-20</span>
              <span>오후 1시 30분 ~ 오후 1시 55분</span>
              <span>1.5km</span>
            </div>
            <div className="text-right">
              <button className="text-primary text-2xs gap-x-1 ">더보기</button>
            </div>
          </div>
        </div>
      </main>
      <div className="fixed bottom-20 left-0 right-0 flex justify-center">
        <Link
          href="/walk/start"
          className="z-10 rounded-full bg-primary-500 text-white font-bold py-3 px-6 shadow-md hover:shadow-lg transition duration-300 ease-in-out"
        >
          산책 시작하기
        </Link>
      </div>
      <Navbar />
    </div>
  );
}

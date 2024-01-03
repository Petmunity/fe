import DndButtonContainer from "@/components/dnd/DndButtonContainer";
import NotiBanner from "@/components/NotiBanner";
import TodayDiary from "@/components/TodayDiary";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import { PlusCircle } from "@/components/icons";
import { Metadata } from "next/types";

// TODO: 기본적으로 사용되는 글쓰기 버튼 => (산책,식사,화장실,간식...) 추가로 커스텀된 것도 api로 받아와야함..
const buttonItems = [
  {
    src: "/assets/walking.png",
    title: "산책",
    href: "/walk/start",
    bgColor: "#2970FF",
  },
  {
    src: "/assets/meal.png",
    title: "식사",
    href: "/diary/meal",
    bgColor: "#06AED4",
  },
  {
    src: "/assets/toilet.png",
    title: "화장실",
    href: "/diary/toilet",
    bgColor: "#15B79E",
  },
  {
    src: "/assets/snack.png",
    title: "간식",
    href: "/diary/snack",
    bgColor: "#875BF7",
  },
];

export const metadata: Metadata = {
  title: "반려일기",
  description: "반려동물과 함께하는 일상을 기록해보세요!",
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header title="반려일기" />
      <div className="flex flex-col p-4">
        <NotiBanner content="반려일기를 작성해주세요!" time="1분" />
        <div>
          <DndButtonContainer buttonItems={buttonItems} />
          <div className="flex justify-end mt-2 px-3 py-1">
            <button className="text-primary text-2xs flex items-center gap-x-1">
              <PlusCircle />
              입력칸 추가
            </button>
          </div>
        </div>
      </div>
      <div className="h-1.5 bg-gray-100" />
      <div className="flex flex-col p-4">
        <h1 className="font-medium mb-3">오늘의 일기</h1>
        {/* TODO: API 연동 */}
        <TodayDiary name="연두" userName="연두형아" />
      </div>
      <Navbar />
    </div>
  );
}

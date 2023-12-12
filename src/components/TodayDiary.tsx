import Image from "next/image";

interface TodayDiaryProps {
  name: string;
  userName: string;
}

// TODO: api 연결해야함
export default function TodayDiary({ name, userName }: TodayDiaryProps) {
  return (
    <main className="flex flex-col px-4 pt-5 pb-7 rounded-xl space-y-5 shadow-sm bg-primary-100 border border-[#EAECF0]">
      <div>
        <span className="text-primary-300 text-sm">귀염둥이 {name}네 </span>
        {/* <div className="rounded-full">images</div> */}
      </div>
      <div className="space-y-3">
        <div className="text-xl font-medium">
          {userName}님,
          <br />곧 영양제 챙겨줄 시간이네요!
        </div>
        <div className="flex justify-center">
          <Image
            src="/assets/dogBirthday.png"
            alt="dog"
            width={124}
            height={160}
          />
        </div>
      </div>
      <div className="flex  justify-between text-center px-3">
        <div className="flex flex-col">
          <span>1.8Km</span>
          <span className="text-xs">산책</span>
        </div>

        <div className="flex flex-col">
          <span>3회</span>
          <span className="text-xs">밥</span>
        </div>
        <div className="flex flex-col">
          <span>3회</span>
          <span className="text-xs">간식</span>
        </div>
        <div className="flex flex-col">
          <span>5회</span>
          <span className="text-xs">화장실</span>
        </div>
      </div>
    </main>
  );
}

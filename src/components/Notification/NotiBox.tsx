// TODO: bg-[#7839EE0A] 색상 새 활동일 때만 적용
export default function NotiBox() {
  return (
    <div className="p-4 border-b border-b-gray-300 bg-[#7839EE0A]">
      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-primary font-medium text-xs leading-4">
            새활동
          </span>
          <span className="text-2xs font-medium leading-3 text-[#AFAFAF]">
            1일 전
          </span>
        </div>

        <h1 className="text-gray-900 font-semibold leading-6">
          연두에게 간식을 줬어요!
        </h1>
        <h2 className="text-sm text-gray-800 leading-5">
          연두가 간식을 3회째 먹고 있습니다.
        </h2>
      </div>
    </div>
  );
}

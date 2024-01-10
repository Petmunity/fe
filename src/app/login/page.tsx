import LoginButton from "./LoginButton";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div
        style={{ maxHeight: 500, minHeight: 500 }}
        className="my-auto flex flex-col items-center justify-between"
      >
        <div className="flex flex-col items-center">
          <span className="mb-2 text-primary-500">우리 아이 공유 다이어리</span>
          <span className="tracking-tight font-semibold text-primary-500 text-6xl">
            펫뮤니티
          </span>
        </div>
        <div className=" flex w-full flex-col items-center gap-2">
          <LoginButton />
        </div>
      </div>
    </div>
  );
}

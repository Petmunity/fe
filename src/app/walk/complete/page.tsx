import Header from "@/components/common/Header";
import Link from "next/link";

export default function CompletePage() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header title="산책완료" />
        <main className="p-4 space-y-5">
          <h1 className="text-2xl text-primary font-semibold">산책 완료!</h1>
          <div className="flex justify-between text-sm font-medium">
            <span>2023.12.18</span>
            <span>오전 10:30 ~ 오전 11:10</span>
          </div>
          <div className="flex justify-between">
            <div>
              <h1>산책시간</h1>
              <h1>40분</h1>
            </div>
            <div>
              <h1>산책거리</h1>
              <h1>1.2km</h1>
            </div>
          </div>
        </main>
      </div>
      <section id="CTA" className="sticky bottom-0 bg-white px-5 pb-4">
        <Link href="/" className="button-violet">
          산책종료
        </Link>
      </section>
    </>
  );
}

import React, { Suspense } from "react";
import Header from "../../components/common/Header";
import Loading from "./Loading";

export default function TestPage() {
  return (
    <>
      <Header title="테스트" elements={{ left: <Header.Back /> }} />
      <main className="p-4">
        <div>
          <Suspense fallback={<Loading />}>{/* <Posts /> */}</Suspense>
          <Loading />
        </div>
      </main>
    </>
  );
}

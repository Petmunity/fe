"use client";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Tab from "@/components/common/Tab";
import { LineChart, BarChart } from "@/components/report/chart";

import { useState } from "react";

export default function CalendarPage() {
  const labels = ["캘린더", "리포트"];

  const [focusedIndex, setFocusedIndex] = useState(0);
  //   const { data, error } = useQuery('calendar', () => {
  //     return fetch('http://localhost:3000/api/calendar').then((res) =>
  //       res.json()
  //     );
  //   });

  //   if (error) {
  //     return <div>Error loading calendar</div>;
  //   }

  //   if (!data) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <div className="flex min-h-screen flex-col">
      <Header title="캘린더" />
      <Tab
        labels={labels}
        focusedIndex={focusedIndex}
        changeIndex={setFocusedIndex}
      />
      <main className="pt-5">
        {focusedIndex === 0 && <h1>캘린더</h1>}
        {focusedIndex === 1 && (
          <>
            <div className="px-4 flex flex-col space-y-4">
              <div>
                <h1 className="font-medium text-lg leading-7 text-gray-900">
                  오늘까지 " " 했어요!
                </h1>
                <div className="text-xs text-ellipsis mt-1 text-tertiary-600">
                  지난달 이맘때보다 산책량이{" "}
                  <span className="font-medium">1시간</span> 늘었어요.
                </div>
              </div>
              <LineChart />
            </div>
            <hr className="divider my-4"></hr>
            <div className="px-4 flex flex-col space-y-4">
              <div>
                <h1 className="font-medium text-lg leading-7 text-gray-900">
                  식사량이 많이 늘었어요!
                </h1>
                <div className="text-xs text-ellipsis mt-1 text-tertiary-600">
                  지난달 이맘때보다 식사량이{" "}
                  <span className="font-medium">70g</span> 늘었어요.
                </div>
              </div>
              <BarChart />
            </div>
          </>
        )}
      </main>
      <Navbar />
    </div>
  );
}

"use client";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Tab from "@/components/common/Tab";
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
      <main>
        {focusedIndex === 0 && <h1>캘린더</h1>}
        {focusedIndex === 1 && <h1>리포트</h1>}
      </main>
      <Navbar />
    </div>
  );
}

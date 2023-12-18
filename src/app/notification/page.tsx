"use client";
import { useState } from "react";
import NotiBox from "@/components/Notification/NotiBox";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Tab from "@/components/common/Tab";

export default function NotificationPage() {
  const labels = ["활동 알림", "메모장"];

  const [focusedIndex, setFocusedIndex] = useState(0);
  return (
    <div className="flex min-h-screen flex-col">
      <Header title="알림" />
      <Tab
        labels={labels}
        focusedIndex={focusedIndex}
        changeIndex={setFocusedIndex}
      />
      <main>
        {focusedIndex === 0 && (
          <div>
            {Array.from({ length: 10 }).map((_, i) => (
              <NotiBox key={i} />
            ))}
          </div>
        )}
        {focusedIndex === 1 && <h1>메모장</h1>}
      </main>
      <Navbar />
    </div>
  );
}

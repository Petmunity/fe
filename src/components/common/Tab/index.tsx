"use client";
import { useState, useRef, useEffect, type ReactNode } from "react";

export default function Tab({
  focusedIndex,
  changeIndex,
  labels,
  className = "",
}: {
  focusedIndex: number;
  changeIndex?: (index: number) => void;
  labels: ReactNode[];
  className?: string;
}) {
  const [tabWidth, setTabWidth] = useState(0);
  const [tabOffsetX, setTabOffsetX] = useState(0);

  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const setTabPosition = () => {
      const currentTab = tabsRef.current[focusedIndex];
      setTabOffsetX(currentTab?.offsetLeft ?? 0);
      setTabWidth(currentTab?.clientWidth ?? 0);
    };

    setTabPosition();
    window.addEventListener("resize", setTabPosition);

    return () => window.removeEventListener("resize", setTabPosition);
  }, [focusedIndex]);

  return (
    <div className={`relative w-full whitespace-nowrap  bg-white ${className}`}>
      <nav
        role="tablist"
        className={"break-keep pt-1 grid"}
        style={{ gridTemplateColumns: `repeat(${labels.length}, 1fr)` }}
      >
        {labels.map((label, i) => (
          <button
            type="button"
            role="tab"
            key={i}
            ref={(index) => (tabsRef.current[i] = index)}
            aria-selected={focusedIndex === i}
            className="ease px-1 py-2 font-extralight text-gray-950 duration-300 aria-selected:font-medium aria-selected:text-primary-500 "
            onClick={() => changeIndex && changeIndex(i)}
          >
            {label}
          </button>
        ))}
      </nav>
      <span
        className="ease absolute bottom-0 block h-0.5 bg-primary-500 transition-all duration-300"
        style={{
          width: tabWidth,
          transform: `translateX(${tabOffsetX}px)`,
        }}
      />
    </div>
  );
}

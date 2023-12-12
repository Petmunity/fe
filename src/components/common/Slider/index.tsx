"use client";
import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

export default function Slider({
  children,
  className = "",
  duration = 5,
  autoSlide = true,
  showBullets = false,
  bulletsColor = "bg-blue-500",
}: {
  children: React.ReactElement[];
  className?: string;
  duration?: number;
  autoSlide?: boolean;
  showBullets?: boolean;
  bulletsColor?: string;
}) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const offsetX = -100 * focusedIndex;

  const moveSlide = (direction: "left" | "right") => {
    const next = direction === "left" ? focusedIndex - 1 : focusedIndex + 1;
    setFocusedIndex(next % children?.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => moveSlide("right"),
    onSwipedRight: () => moveSlide("left"),
  });

  useEffect(() => {
    if (autoSlide) {
      const interval = setInterval(
        () => {
          setFocusedIndex((focusedIndex + 1) % children.length);
        },
        Math.round(duration * 1000),
      );

      return () => clearInterval(interval);
    }
  }, [autoSlide, children.length, duration, focusedIndex]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <section
        className="ease flex w-full snap-x snap-mandatory flex-nowrap scroll-smooth duration-500"
        style={{ transform: `translateX(${offsetX}%)` }}
        {...handlers}
      >
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            style: { width: "100%", flexShrink: 0, objectFit: "cover" },
          }),
        )}
        맛
      </section>
      {showBullets ? (
        <div className="flex h-14 items-center justify-center space-x-2">
          {React.Children.map(children, (_, index) => (
            <Bullet
              key={index}
              active={index === focusedIndex}
              bulletsColor={bulletsColor}
            />
          ))}
        </div>
      ) : (
        <div className="absolute right-3.5 top-4 rounded-full bg-black px-2.5 py-1 opacity-30">
          <div className="text-xs font-medium leading-tight text-white">
            {focusedIndex + 1}/{children?.length}
          </div>
        </div>
      )}
    </div>
  );
}

function Bullet({
  active = false,
  bulletsColor,
}: {
  active: boolean;
  bulletsColor: string;
}) {
  return (
    <div
      className={`h-2 w-2 rounded-full ${
        active ? bulletsColor : "bg-gray-200"
      }`}
    />
  );
}

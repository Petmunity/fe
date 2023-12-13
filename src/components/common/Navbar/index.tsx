"use client";
import React from "react";
import { Calendar, History, Myprofile, Noti, Walk } from "@/components/icons";

import { usePathname } from "next/navigation";

interface NavbarItem {
  icon: React.ReactElement;
  label: string;
  href: string;
}

export const defaultItems = [
  {
    icon: <History />,
    label: "기록",
    href: "/",
  },
  {
    icon: <Calendar />,
    label: "캘린더",
    href: "/calendar",
  },
  {
    icon: <Walk />,
    label: "산책",
    href: "/walk",
  },
  {
    icon: <Noti />,
    label: "알림",
    href: "/notification",
  },
  {
    icon: <Myprofile />,
    label: "마이",
    href: "/myprofile",
  },
];

export default function Navbar({
  items = defaultItems,
}: {
  items?: NavbarItem[];
}) {
  return (
    <nav
      className="sticky bottom-0 z-40 mt-auto grid w-full gap-x-5 border-t border-gray-200 bg-white px-4 py-[9px] desktop:max-w-[375px]"
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {items?.map((item, idx) => (
        <Navbar.Item
          icon={item.icon}
          label={item.label}
          href={item.href}
          key={item.href + idx}
        />
      ))}
    </nav>
  );
}

Navbar.Item = function Item({ icon, label, href }: NavbarItem) {
  const pathname = usePathname() ?? "";
  const isActive = pathname === href;

  return (
    <a href={href} className="flex flex-col items-center mb-0">
      {React.cloneElement(icon, {
        className: `${isActive ? "text-primary" : "text-gray"}
        }`,
      })}
      <span
        className={`text-xs leading-tight mt-[9px] ${
          isActive ? "font-medium text-primary" : "font-extralight text-gray"
        }`}
      >
        {label}
      </span>
    </a>
  );
};

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Arrow } from "@/components/icons";

export const Back = ({ href }: { href?: string }) => {
  const router = useRouter();

  const useBack = () => (href ? router.push(href) : router.back());

  return (
    <a href={href} onClick={useBack} className="text-gray-400">
      <Arrow />
    </a>
  );
};

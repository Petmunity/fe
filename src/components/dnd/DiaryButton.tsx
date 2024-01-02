"use client";

import Image from "next/image";
import { DropDown } from "../icons";
import { Tooltip } from "react-tooltip";
import { useDiaryButton } from "@hooks/useDiaryButton";

interface DiaryButtonProps {
  title: string;
  href: string;
  src: string;
  bgColor: string;
  canDrag: boolean;
  toogleCanDrag?: () => void;
}
// TODO: api 연결해야함

export default function DiaryButton({
  title,
  src,
  bgColor,
  href,
  canDrag,
  toogleCanDrag,
}: DiaryButtonProps) {
  const {
    handleRouterpush,
    handleDropDownClick,
    handleTooltipButtonClick,
    tooltipRef,
  } = useDiaryButton({ href, canDrag, toogleCanDrag });

  return (
    <div
      onClick={handleRouterpush}
      className={`rounded-xl px-4 py-5 flex flex-col justify-between w-full h-[143px] cursor-pointer`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex justify-between">
        <span className="text-sm text-white font-medium">{title}</span>
        <div className="">
          <DropDown
            className="text-white"
            id="tooltip"
            onClick={handleDropDownClick}
          />
          <Tooltip
            anchorSelect="#tooltip"
            clickable
            className="flex flex-col"
            ref={tooltipRef}
          >
            <button onClick={handleTooltipButtonClick}>
              {canDrag === false ? "순서변경" : "변경완료"}
            </button>
          </Tooltip>
        </div>
      </div>
      <div className="flex justify-end  overflow-hidden">
        <Image
          className="object-contain"
          src={src}
          alt="diary-button"
          width={75}
          height={70}
        />
      </div>
    </div>
  );
}

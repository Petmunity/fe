"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DropDown } from "./icons";
import { Tooltip } from "react-tooltip";

interface BlockLinkButtonProps {
  title: string;
  href: string;
  src: string;
  bgColor: string;
  canDrag: boolean;
  toogleCanDrag: () => void;
}
// TODO: api 연결해야함

export default function BlockLinkButton({
  title,
  href,
  src,
  bgColor,
  canDrag,
  toogleCanDrag,
}: BlockLinkButtonProps) {
  const router = useRouter();

  const handleRouterpush = () => {
    router.push(href);
  };

  const handleDropDownClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const handleTooltipButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toogleCanDrag();
  };

  return (
    <div
      onClick={handleRouterpush}
      className={`rounded-xl px-4 py-5 flex flex-col justify-between w-full h-[143px] cursor-pointer ${
        canDrag ? "animate-shake" : ""
      }`}
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
          <Tooltip anchorSelect="#tooltip" clickable className="flex flex-col">
            <button onClick={handleTooltipButtonClick}>
              {canDrag === false ? "순서변경" : "변경완료"}
            </button>
            <button>삭제</button>
          </Tooltip>
        </div>
      </div>
      <div className="flex justify-end">
        <Image
          className="object-contain"
          src={src}
          alt="diary-button"
          width={75}
          height={50}
        />
      </div>
    </div>
  );
}

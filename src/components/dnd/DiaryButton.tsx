"use client";

import Image from "next/image";
import { DropDown } from "../icons";
import { Tooltip } from "react-tooltip";
import Modal from "../common/Modal";
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
    closeModal,
    isOpen,
    handleConfirmButtonClick,
  } = useDiaryButton({ href, canDrag, toogleCanDrag });

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="p-5 h-fit flex items-center flex-col gap-y-6">
          <p className="text-center text-lg">
            시작버튼을 누르면 <br />
            산책이 바로 시작되요!
            <br />
            준비가 되셨다면 눌러주세요!
          </p>

          <button
            className="button-violet"
            onClick={() => {
              handleConfirmButtonClick(href);
            }}
          >
            확인
          </button>
        </div>
      </Modal>
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
    </>
  );
}

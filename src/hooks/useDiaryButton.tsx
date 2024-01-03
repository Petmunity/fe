import { useRouter } from "next/navigation";
import { useRef } from "react";
import { TooltipRefProps } from "react-tooltip";
import { useModal } from "./useModal";

interface useDiaryButtonProps {
  href: string;
  canDrag: boolean;
  toogleCanDrag?: () => void;
}

export const useDiaryButton = ({
  href,
  canDrag,
  toogleCanDrag,
}: useDiaryButtonProps) => {
  const router = useRouter();
  const tooltipRef = useRef<TooltipRefProps>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const handleRouterpush = () => {
    if (canDrag) return;

    if (href === "/walk/start") {
      openModal();
    } else {
      router.push(href);
    }
  };

  // 확인 버튼을 눌렀을 때의 동작
  const handleConfirmButtonClick = (href: string) => {
    router.push(href);
  };

  const handleDropDownClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const handleTooltipButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (toogleCanDrag) {
      toogleCanDrag();
      tooltipRef.current?.close();
    }
  };

  return {
    handleRouterpush,
    handleDropDownClick,
    handleTooltipButtonClick,
    handleConfirmButtonClick,
    isOpen,
    openModal,
    closeModal,
    tooltipRef,
    canDrag,
  };
};

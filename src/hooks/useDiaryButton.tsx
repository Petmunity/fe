import { useRouter } from "next/navigation";
import { useRef } from "react";
import { TooltipRefProps } from "react-tooltip";

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

  const handleRouterpush = () => {
    if (canDrag) return;
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
    tooltipRef,
    canDrag,
  };
};

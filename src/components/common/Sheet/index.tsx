"use client";

import Backdrop from "../Backdrop";

interface BottomSheetProps {
  isOpen: boolean;
  closeSheet: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function BottomSheet({
  isOpen,
  closeSheet,
  children,
  className,
}: BottomSheetProps) {
  return isOpen ? (
    <>
      <Backdrop isOpen={isOpen} onClick={closeSheet} />
      <div
        className={`fixed inset-0 h-fit z-50 mx-auto mt-auto w-full overflow-y-auto rounded-t-xl bg-white md:max-w-[375px] ${className}`}
      >
        {children}
      </div>
    </>
  ) : null;
}

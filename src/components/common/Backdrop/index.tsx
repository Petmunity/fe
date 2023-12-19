"use client";
interface BackdropProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function Backdrop({ isOpen, onClick }: BackdropProps) {
  return (
    <div
      hidden={!isOpen}
      onClick={onClick}
      className={`fixed inset-0 z-50 h-full w-full bg-black opacity-50`}
    />
  );
}

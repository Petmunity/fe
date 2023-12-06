"use client";

import { useState, useEffect, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function Modal({
  children,
  isOpen,
  onClose,
  className,
}: PropsWithChildren<ModalProps>) {
  const [mounted, setMounted] = useState(false);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    setModalRoot(document.getElementById("modal-root") as HTMLElement);
  }, []);

  if (typeof window === "undefined") return <></>;

  if (!mounted) return <></>;

  return modalRoot
    ? createPortal(
        <>
          <Backdrop isOpen={isOpen} onClick={onClose} />
          <div
            hidden={!isOpen}
            className={`fixed inset-0 top-56 z-50 mx-auto h-fit w-10/12 rounded-lg bg-white md:max-w-[375px] ${className}`}
          >
            {children}
          </div>
        </>,
        modalRoot,
      )
    : null;
}

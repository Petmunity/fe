"use client";

import { useState, useEffect, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";

export default function Modal({
  children,
  isOpen,
  onClose,
  style,
  className,
}: PropsWithChildren<any>) {
  const [mounted, setMounted] = useState(false);
  const modalRoot =
    typeof window !== "undefined"
      ? document.getElementById("modal-root") || document.body
      : null;

  useEffect(() => setMounted(true), []);

  return mounted && modalRoot
    ? createPortal(
        <>
          <Backdrop isOpen={isOpen} onClick={onClose} />
          <div
            hidden={!isOpen}
            style={{ ...style, display: isOpen ? undefined : "none" }}
            className={`fixed inset-0 top-56 z-50 mx-auto h-fit w-10/12 overflow-y-auto rounded-lg bg-white md:max-w-[375px] ${className}`}
          >
            {children}
          </div>
        </>,
        modalRoot,
      )
    : null;
}

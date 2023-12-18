import type { ReactElement } from "react";
import { Back } from "./items";

function Header({
  title,
  elements: { left, right } = {},
  sticky = true,
  className,
}: {
  title?: string;
  elements?: { left?: ReactElement; right?: ReactElement };
  className?: string;
  sticky?: boolean;
}) {
  return (
    <header
      className={`${
        sticky ? "sticky top-0" : ""
      } z-40 grid grid-cols-[1fr_2fr_1fr] bg-white p-4  ${className} border-b   border-gray-200`}
    >
      <div className="mr-auto flex gap-2">{left}</div>
      <h1 className="flex w-full items-center justify-center text-center font-black text-lg leading-none">
        {title}
      </h1>
      <div className="ml-auto flex gap-4">{right}</div>
    </header>
  );
}

Header.Back = Back;

export default Header;

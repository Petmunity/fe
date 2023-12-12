import Link from "next/link";
import Image from "next/image";
import { DropDown } from "./icons";

interface BlockLinkButtonProps {
  title: string;
  href: string;
  src: string;
  bgColor: string;
}
// TODO: api 연결해야함

export default function BlockLinkButton({
  title,
  href,
  src,
  bgColor,
}: BlockLinkButtonProps) {
  return (
    <Link
      href={href}
      className="rounded-xl px-4 py-5 flex flex-col justify-between w-full h-[143px]"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex justify-between">
        <span className="text-sm text-white font-medium">{title}</span>
        <DropDown className="text-white" />
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
    </Link>
  );
}

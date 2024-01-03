import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="rounded-xl px-4 py-5 flex flex-col justify-between w-full h-[143px] cursor-pointer" />{" "}
      <Skeleton className="rounded-xl px-4 py-5 flex flex-col justify-between w-full h-[143px] cursor-pointer" />{" "}
      <Skeleton className="rounded-xl px-4 py-5 flex flex-col justify-between w-full h-[143px] cursor-pointer" />{" "}
      <Skeleton className="rounded-xl px-4 py-5 flex flex-col justify-between w-full h-[143px] cursor-pointer" />
    </div>
  );
}

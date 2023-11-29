import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-40 rounded-xl" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-44 h-[1.25rem]" />
        <Skeleton className=" h-[1rem]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-[30ch] h-[1.25rem]" />
        <Skeleton className="h-[1rem]" />
      </div>
    </div>
  );
}

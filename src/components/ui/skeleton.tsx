import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "h-[200px] animate-pulse rounded-md bg-gray-200",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };

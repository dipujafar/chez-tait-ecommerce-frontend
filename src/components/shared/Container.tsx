import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "max-w-[2520px] mx-auto xl:px-48 lg:px-32 md:px-10 px-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;

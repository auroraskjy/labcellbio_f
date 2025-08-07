import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface BannerWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function BannerWrapper({
  children,
  className,
  ...props
}: BannerWrapperProps) {
  return (
    <div
      className={cn(
        "w-full",
        "h-[50vh]", // 모바일 (641px 미만)
        "min-[641px]:h-[70vh]", // 태블릿 (641px-1024px): 70vh
        "min-[1025px]:h-[60vh]",
        "min-[1025px]:min-h-[550px]",
        "min-[1025px]:max-h-[660px]", // PC (1025px 이상): 60vh, min 550px, max 660px
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

"use client";

import { useActivePath } from "@/components/admin-layout/hooks/use-active-path";
import { cn } from "@/lib/utils";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface MobileHeaderLinkItemProps {
  title: string;
  href: string;
  icon: LucideIcon;
}

export default function MobileHeaderLinkItem({
  title,
  href,
  icon: Icon,
}: MobileHeaderLinkItemProps) {
  const { isActive } = useActivePath({ href });

  return (
    <Link href={href} key={title}>
      <Button
        variant="ghost"
        className={cn(
          "w-full flex items-center justify-start gap-3 p-3 h-fit rounded-3xl",
          isActive && "text-brand/10 hover:text-brand/10"
        )}
      >
        <Icon
          className={cn(
            "!w-[14px] !h-[14px]",
            isActive ? "text-brand" : "text-muted-foreground"
          )}
        />

        <p
          className={cn(
            "font-medium text-[12.25px]",
            isActive ? "text-brand" : "text-muted-foreground"
          )}
        >
          {title}
        </p>
      </Button>
    </Link>
  );
}

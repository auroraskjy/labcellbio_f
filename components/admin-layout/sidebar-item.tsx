"use client";

import { PropsWithChildren } from "react";

import { signout } from "@/actions/auth";
import { useActivePath } from "@/components/admin-layout/hooks/use-active-path";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface SidebarItemProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  href?: string;
  isLogout?: boolean;
}

export default function SidebarItem({
  icon: Icon,
  title,
  subtitle,
  href,
  isLogout = false,
}: SidebarItemProps) {
  const { isActive } = useActivePath({ href });

  return (
    <LinkWrapper href={href}>
      <form action={isLogout ? signout : undefined}>
        <Button
          variant="ghost"
          className={cn(
            "w-full flex items-center justify-start gap-3 p-3 h-fit rounded-3xl border-brand/20",
            isActive && "border bg-brand/10 hover:bg-brand/10",
            isLogout && "hover:text-red-600 group hover:bg-red-50"
          )}
          type={isLogout ? "submit" : "button"}
        >
          <div
            className={cn(
              "w-[28px] h-[28px] rounded-full flex items-center justify-center transition-colors",
              isActive && "bg-brand/10",
              isLogout && "group-hover:bg-red-100"
            )}
          >
            <Icon
              className={cn(
                "!w-[14px] !h-[14px]",
                isActive ? "text-brand" : "text-muted-foreground",
                isLogout && "group-hover:text-red-600"
              )}
            />
          </div>

          <div className="flex flex-col items-start">
            <p
              className={cn(
                "font-medium text-[12.25px]",
                isActive ? "text-brand" : "text-muted-foreground",
                isLogout && "group-hover:text-red-600"
              )}
            >
              {title}
            </p>
            <p className="text-[10.5px] text-muted-foreground/60 truncate">
              {subtitle}
            </p>
          </div>
        </Button>
      </form>
    </LinkWrapper>
  );
}

const LinkWrapper = ({
  children,
  href,
}: PropsWithChildren<{ href?: string }>) => {
  if (!href) {
    return <>{children}</>;
  }

  return <Link href={href}>{children}</Link>;
};

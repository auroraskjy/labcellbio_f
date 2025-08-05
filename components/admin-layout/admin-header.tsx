import { PropsWithChildren } from "react";

import { signout } from "@/actions/auth";

import { SIDEBAR_MENU_ITEMS } from "@/components/admin-layout/constant";

import Link from "next/link";

import MobileHeaderLinkItem from "@/components/admin-layout/mobile-header-link-item";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, HomeIcon, LogOutIcon, UserIcon } from "lucide-react";

export default function AdminHeader() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <header className="p-6 border-b border-border/30 h-15 md:h-21.5 sticky top-0 w-full bg-background flex items-center justify-between">
      <div className="hidden md:flex flex-col">
        <p className="text-lg font-[600]">LABCELLBIO</p>
        <p className="text-xs text-muted-foreground">{formattedDate}</p>
      </div>

      <div className="md:hidden flex items-center">
        {SIDEBAR_MENU_ITEMS.map(({ title, href, icon }, index) => (
          <div key={title} className="flex items-center">
            <MobileHeaderLinkItem title={title} href={href} icon={icon} />
            {index !== SIDEBAR_MENU_ITEMS.length - 1 && (
              <div className="w-[1px] h-3 bg-border mx-2" />
            )}
          </div>
        ))}
      </div>

      <DropdownMenuWrapper>
        <Button
          variant="ghost"
          className="hidden md:flex gap-3 items-center hover:bg-gray-50 p-3 w-fit h-fit rounded-3xl"
        >
          <div className="w-[28px] h-[28px] rounded-full bg-brand/10 flex items-center justify-center">
            <UserIcon className="!w-[14px] !h-[14px] text-brand" />
          </div>

          <div className="flex flex-col items-start">
            <p className="text-[0.765rem] font-medium text-foreground">admin</p>
            <p className="text-[0.66rem] text-muted-foreground">관리자</p>
          </div>

          <ChevronDownIcon className="!w-[14px] !h-[14px] text-muted-foreground" />
        </Button>
      </DropdownMenuWrapper>

      <DropdownMenuWrapper>
        <Button
          variant="ghost"
          className="w-[28px] h-[28px] rounded-full bg-brand/10 md:hidden flex items-center justify-center hover:bg-brand/10"
        >
          <UserIcon className="!w-[14px] !h-[14px] text-brand" />
        </Button>
      </DropdownMenuWrapper>
    </header>
  );
}

const DropdownMenuWrapper = ({ children }: PropsWithChildren) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-3 md:p-4 space-y-4" align="start">
        <DropdownMenuGroup asChild>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 md:w-10.5 md:h-10.5 rounded-full bg-brand/10 flex items-center justify-center">
              <UserIcon className="!w-4 !h-4 md:!w-5.25 md:!h-5.25 text-brand" />
            </div>

            <div className="flex flex-col items-start">
              <p className="text-sm font-medium text-foreground">LABCELLBIO</p>
              <span
                data-slot="badge"
                className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden [a&amp;]:hover:bg-brand/90 text-[0.66rem] mt-1 bg-brand/10 text-brand border-brand/20"
              >
                관리자
              </span>
            </div>
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/" className="!p-0">
              <Button
                variant="ghost"
                className="w-full gap-6 justify-start"
                type="button"
              >
                <HomeIcon className="!w-3.5 !h-3.5 text-blue-600" />
                <p className="text-xs font-medium">홈으로 이동</p>
              </Button>
            </Link>
          </DropdownMenuItem>

          <form action={signout}>
            <DropdownMenuItem
              asChild
              className="cursor-pointer hover:!bg-red-50"
            >
              <Button
                variant="ghost"
                className="w-full gap-6 justify-start"
                type="submit"
              >
                <LogOutIcon className="!w-3.5 !h-3.5 text-red-600 hover:text-red-700" />
                <p className="text-red-600 hover:text-red-700 text-xs font-medium">
                  로그아웃
                </p>
              </Button>
            </DropdownMenuItem>
          </form>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

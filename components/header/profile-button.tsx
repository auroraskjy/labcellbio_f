"use client";

import { signout } from "@/actions/auth";
import { ProfileIcon } from "@/components/icons/profile-icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";

export default function ProfileButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signout();
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="사용자 메뉴 열기"
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-controls="user-menu"
        >
          <ProfileIcon className="size-[16px]" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        id="user-menu"
        className="w-[120px]"
        align="end"
        role="menu"
        aria-label="사용자 메뉴"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link
              href="/admin/board"
              className="w-full"
              aria-label="관리자 페이지로 이동"
            >
              Admin
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogout}
            aria-label="로그아웃"
            role="menuitem"
            className="cursor-pointer"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

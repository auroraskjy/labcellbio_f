"use client";

import { signout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ProfileIcon } from "../icons/profile";

export default function ProfileButton() {
  const handleLogout = async () => {
    try {
      await signout();
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <ProfileIcon className="size-[16px]" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[30px]" align="end">
        <DropdownMenuGroup>
          <Link href="/admin">
            <DropdownMenuItem className="cursor-pointer">
              Admin
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

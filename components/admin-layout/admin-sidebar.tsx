import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { FileTextIcon, ImageIcon, LogOutIcon } from "lucide-react";
import { PropsWithChildren } from "react";
import SidebarItem from "./sidebar-item";

export default function AdminSidebar() {
  return (
    <div className="w-56 border-r border-border/30 hidden md:block sticky top-0 left-0 h-screen">
      <div className="p-6 border-b border-border/30 w-full h-21.5">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <h1 className="text-[14px] font-bold">LABCELLBIO</h1>
            <p className="text-[10.5px] text-muted-foreground">관리시스템</p>
          </div>
        </div>
      </div>
      {/* list */}

      <div className="w-full relative h-[calc(100vh-5.375rem)]">
        <SidebarGroup>
          <SidebarItem
            icon={FileTextIcon}
            title="게시글"
            subtitle="게시글 관리"
            href="/admin"
          />
          <SidebarItem
            icon={ImageIcon}
            title="배너 이미지"
            subtitle="배너 이미지 관리"
            href="/admin/banner"
          />
        </SidebarGroup>

        {/* logout */}
        <SidebarGroup className="absolute bottom-0 left-0 border-t border-border/30">
          <SidebarItem
            isLogout
            icon={LogOutIcon}
            title="로그아웃"
            subtitle="관리자 로그아웃"
          />
        </SidebarGroup>
      </div>
    </div>
  );
}

function SidebarGroup({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("w-full p-[14px] flex flex-col gap-[7px]", className)}>
      {children}
    </div>
  );
}

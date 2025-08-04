import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminSidebar() {
  return (
    <div className="w-64 border-r border-border/30">
      <div className="p-6 border-b border-border/30 w-full ">
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

      {/* logout */}
    </div>
  );
}

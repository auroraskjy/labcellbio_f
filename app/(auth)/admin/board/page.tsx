import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import BoardList from "./_components/board-list";

export default async function AdminPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end w-full">
        <Link href="/admin/board/new">
          <Button
            variant="default"
            size="sm"
            className="bg-brand hover:bg-brand/90 rounded-2xl w-full md:w-fit h-fit p-[7px_10.5px] gap-3"
          >
            <PlusIcon className="!w-4 !h-4" />
            게시글 등록
          </Button>
        </Link>
      </div>

      <BoardList />
    </div>
  );
}

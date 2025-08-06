import { Button } from "@/components/ui/button";
import { getBoardList } from "@/services/board";
import { FileTextIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function AdminPage() {
  const boardList = await getBoardList();

  return (
    <div>
      {/* top */}
      <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex flex-col items-start gap-1">
          <h1 className="flex items-center gap-3 text-[1.315rem] font-[600]">
            <div className="w-8.75 h-8.75 md:w-10 md:h-10 rounded-full bg-brand/10 flex items-center justify-center">
              <FileTextIcon className="!w-5 !h-5 text-brand" />
            </div>
            게시글 리스트
          </h1>

          <p className="text-sm text-muted-foreground">
            모든 게시글 현황을 한눈에 확인하세요
          </p>
        </div>

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

      {/* List */}
    </div>
  );
}

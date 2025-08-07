"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useBoardList } from "../_hooks/use-board-list";
import BoardItem from "./board-item";

export default function BoardList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBoardList(6);

  const boards = data?.pages.flatMap((page) => page.boards) ?? [];

  return (
    <div className="rounded-2xl w-full p-5 bg-white shadow-md">
      <Table className="border-none">
        <TableCaption>
          {hasNextPage ? (
            <Button
              onClick={() => fetchNextPage()}
              loading={isFetchingNextPage}
              disabled={isFetchingNextPage}
            >
              더보기
            </Button>
          ) : (
            <span>모든 게시글을 불러왔습니다</span>
          )}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">썸네일</TableHead>
            <TableHead className="text-center">제목</TableHead>
            <TableHead className="w-[180px] text-center">작성자</TableHead>
            <TableHead className="w-[120px] text-right">작성일</TableHead>
            <TableHead className="text-right">액션</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {boards.map((board) => (
            <BoardItem board={board} key={board.id} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

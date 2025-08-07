"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatDateSimple } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useBoardList } from "../_hooks/use-board-list";

export default function BoardList() {
  const router = useRouter();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBoardList(6);

  const boards = data?.pages.flatMap((page) => page.boards) ?? [];

  const handleRowClick = (id: number) => {
    router.push(`/admin/board/${id}`);
  };

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
          </TableRow>
        </TableHeader>

        <TableBody>
          {boards.map(
            ({ id, thumbnail, title, author, authorImage, createdAt }) => (
              <TableRow
                key={id}
                className="cursor-pointer"
                onClick={() => handleRowClick(id)}
              >
                <TableCell>
                  <div className="w-20 h-15 rounded-lg overflow-hidden relative">
                    <Image
                      src={thumbnail}
                      alt={"thumbnail"}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="text-center">{title}</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={authorImage} />
                    </Avatar>
                    <span>{author}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {formatDateSimple(createdAt)}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}

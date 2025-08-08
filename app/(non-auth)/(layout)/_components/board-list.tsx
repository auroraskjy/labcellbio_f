"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useBoardList } from "@/hooks/use-board-list";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BoardList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBoardList(8);

  const boards = data?.pages.flatMap((page) => page.boards) ?? [];

  // 페이지네이션 계산
  const currentPage = data?.pages.length ?? 0;
  const totalPages = data?.pages[0]?.totalPages ?? 0;

  return (
    <div className="max-w-[1280px] w-full mx-auto px-5">
      <div className="flex flex-col items-start md:items-center justify-center mb-[15px] md:mb-[30px]">
        <h2 className="text-xl md:text-4xl font-bold">최근 게시글</h2>
        <p className="text-[14px] md:text-[17px] text-muted-foreground font-normal mt-[5px]">
          LABCELLBIO의 아이템을 만나보세요!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mx-auto">
        {boards.map((board) => (
          <Link key={board.id} href={`/board/${board.id}`} className="w-full">
            <div className="flex flex-col w-full">
              <div className="aspect-square w-full overflow-hidden rounded-xl relative">
                <Image
                  src={board.thumbnail}
                  alt={board.title}
                  fill
                  className="object-cover"
                />
              </div>

              <strong className="text-sm md:text-[17px] font-bold truncate mt-2">
                {board.title}
              </strong>

              <span className="line-clamp-2 text-sm text-[#aaaaaa]">
                {board.description}
              </span>

              <div className="flex items-center gap-2 mt-2">
                <Avatar>
                  <AvatarImage
                    src={board.authorImage}
                    className="object-cover"
                  />
                </Avatar>

                <span className="text-sm text-black">{board.author}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-10 md:mt-15">
          <Button
            variant="outline"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="!px-4 h-[40px]"
          >
            더보기
            <span className="ml-2">
              {currentPage}/{totalPages}
            </span>
            <ChevronDownIcon />
          </Button>
        </div>
      )}
    </div>
  );
}

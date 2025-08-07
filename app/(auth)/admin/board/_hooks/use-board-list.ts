import { getBoardList } from "@/services/board/board";
import { GetBoardResponse } from "@/services/board/types";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useBoardList = (pageSize: number = 6) => {
  return useInfiniteQuery<GetBoardResponse>({
    queryKey: ["boardList", pageSize],
    queryFn: ({ pageParam = 1 }) =>
      getBoardList({ page: pageParam as number, pageSize }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

import { createBoard, updateBoard } from "@/services/board/board";
import { CreateBoardRequest } from "@/services/board/types";
import { ApiError } from "@/services/http-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UseBoardMutationOptions {
  boardId?: number; // 수정 모드일 때만 제공
}

export const useBoardMutation = ({ boardId }: UseBoardMutationOptions = {}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const isEditMode = !!boardId;

  return useMutation({
    mutationFn: (data: CreateBoardRequest) => {
      return isEditMode ? updateBoard(boardId, data) : createBoard(data);
    },
    onSuccess: () => {
      // boardList 쿼리 무효화하여 목록 새로고침
      queryClient.invalidateQueries({
        queryKey: ["boardList"],
      });

      toast.success(
        isEditMode ? "게시글이 수정되었습니다." : "게시글이 작성되었습니다."
      );

      router.replace("/admin/board");
    },
    onError: (error) => {
      console.log(error);

      if (error instanceof ApiError) {
        error.showToasts((msg) => toast.error(msg));
        console.log("에러 정보:", error.data);
      } else {
        console.error("예상치 못한 에러:", error);
        toast.error("알 수 없는 오류가 발생했습니다.");
      }
    },
  });
};

import { deleteBoard } from "@/services/board/board";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteBoard(id),
    onSuccess: () => {
      // 삭제 성공 시 boardList 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ["boardList"],
      });
      toast.success("게시글이 삭제되었습니다.");
    },
    onError: (error) => {
      console.error("게시글 삭제 실패:", error);
      toast.error("게시글 삭제에 실패했습니다.");
    },
  });
};

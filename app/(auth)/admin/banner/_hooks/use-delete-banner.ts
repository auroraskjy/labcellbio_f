import { deleteBanner } from "@/services/banner/banner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteBanner(id),
    onSuccess: () => {
      // 삭제 성공 시 bannerList 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ["bannerList"],
      });
      toast.success("배너가 삭제되었습니다.");
    },
    onError: (error) => {
      console.error("배너 삭제 실패:", error);
      toast.error("배너 삭제에 실패했습니다.");
    },
  });
};

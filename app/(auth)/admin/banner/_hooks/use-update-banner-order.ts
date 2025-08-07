import { updateBannerDisplayOrder } from "@/services/banner/banner";
import { UpdateBannerDisplayOrderRequest } from "@/services/banner/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateBannerOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: UpdateBannerDisplayOrderRequest) =>
      updateBannerDisplayOrder(request),
    onSuccess: () => {
      // 배너 리스트 쿼리 무효화하여 새로고침
      queryClient.invalidateQueries({
        queryKey: ["bannerList"],
      });
      toast.success("배너 순서가 변경되었습니다.");
    },
    onError: (error) => {
      console.error("배너 순서 변경 실패:", error);
      toast.error("배너 순서 변경에 실패했습니다.");
    },
  });
};

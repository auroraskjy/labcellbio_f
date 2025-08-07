import { createBanner, updateBanner } from "@/services/banner/banner";
import { BannerRequest } from "@/services/banner/types";
import { ApiError } from "@/services/http-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UseBannerMutationOptions {
  bannerId?: number; // 수정 모드일 때만 제공
}

export const useBannerMutation = ({
  bannerId,
}: UseBannerMutationOptions = {}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const isEditMode = !!bannerId;

  return useMutation({
    mutationFn: (data: BannerRequest) => {
      return isEditMode ? updateBanner(bannerId, data) : createBanner(data);
    },
    onSuccess: () => {
      // bannerList 쿼리 무효화하여 목록 새로고침
      queryClient.invalidateQueries({
        queryKey: ["bannerList"],
      });

      toast.success(
        isEditMode ? "배너가 수정되었습니다." : "배너가 생성되었습니다."
      );

      router.replace("/admin/banner");
    },
    onError: (error) => {
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

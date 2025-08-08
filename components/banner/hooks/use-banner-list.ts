import { getBannerList } from "@/services/banner/banner";
import { BannerResponse } from "@/services/banner/types";
import { useQuery } from "@tanstack/react-query";

export const useBannerList = () => {
  return useQuery<BannerResponse[]>({
    queryKey: ["bannerList"],
    queryFn: getBannerList,
  });
};

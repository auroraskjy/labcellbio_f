import { httpClient } from "../http-client";
import {
  BannerRequest,
  BannerResponse,
  UpdateBannerDisplayOrderRequest,
} from "./types";

export const createBanner = async (
  request: BannerRequest
): Promise<BannerResponse> => {
  return httpClient.post<BannerResponse>("/banner", request);
};

export const updateBanner = async (
  id: number,
  request: BannerRequest
): Promise<BannerResponse> => {
  return httpClient.patch<BannerResponse>(`/banner/${id}`, request);
};

export const getBannerList = async (): Promise<BannerResponse[]> => {
  return httpClient.get<BannerResponse[]>("/banner");
};

export const getBannerDetail = async (id: number): Promise<BannerResponse> => {
  return httpClient.get<BannerResponse>(`/banner/${id}`);
};

export const updateBannerDisplayOrder = async (
  request: UpdateBannerDisplayOrderRequest
): Promise<BannerResponse> => {
  return httpClient.patch<BannerResponse>(
    "/banner/display-orders/batch",
    request
  );
};

export const deleteBanner = async (
  id: number
): Promise<{ message: string }> => {
  return httpClient.delete<{ message: string }>(`/banner/${id}`);
};

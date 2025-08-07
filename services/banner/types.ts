export interface BannerRequest {
  title: string;
  subTitle: string;
  bannerImage: string;
}

export interface Upload {
  id: number;
  filename: string;
  originalName: string;
  fileUrl: string;
  s3Key: string;
  contentType: string;
  fileSize: number;
  isDeleted: boolean;
  boardId: number;
  createdAt: string;
  updatedAt: string;
}

export interface BannerResponse {
  id: number;
  title: string;
  subTitle: string;
  bannerImage: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  upload: Upload;
}

export type UpdateBannerDisplayOrderRequest = {
  id: number;
  displayOrder: number;
}[];

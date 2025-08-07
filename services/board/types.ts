export interface GetBoardDTO {
  id: number;
  author: string;
  authorImage: string;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  boardImages: {
    id: number;
    fileUrl: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export type GetBoardResponse = {
  boards: GetBoardDTO[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export interface CreateBoardRequest {
  author: string;
  authorImage: string;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  boardImages: number[] | null;
}

export interface CreateBoardResponse {
  id: number;
  author: string;
  authorImage: string;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  boardImages: {
    id: number;
    fileUrl: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface GetBoardListRequest {
  page: number;
  pageSize: number;
}

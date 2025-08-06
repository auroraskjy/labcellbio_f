export interface GetBoardDTO {
  id: number;
  writerName: string;
  title: string;
  content: string;
  thumbnailUrl: string;
  boardImages: {
    name: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

export type GetBoardResponse = GetBoardDTO[];

export interface CreateBoardRequest {
  author: string;
  authorImage: string;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  boardImages: number[];
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
    boardId: number;
    uploadId: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

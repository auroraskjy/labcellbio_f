import { httpClient } from "./http-client";

interface Board {
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

export const getBoardList = async (): Promise<Board[]> => {
  return httpClient.get<Board[]>("/board");
};

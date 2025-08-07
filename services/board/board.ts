import { httpClient } from "../http-client";
import {
  CreateBoardRequest,
  CreateBoardResponse,
  GetBoardDTO,
  GetBoardListRequest,
  GetBoardResponse,
} from "./types";

export const getBoardList = async (
  request: GetBoardListRequest
): Promise<GetBoardResponse> => {
  return httpClient.get<GetBoardResponse>("/board", {
    params: {
      page: request.page.toString(),
      pageSize: request.pageSize.toString(),
    },
  });
};

export const createBoard = async (
  request: CreateBoardRequest
): Promise<CreateBoardResponse> => {
  return httpClient.post<CreateBoardResponse>("/board", request);
};

export const getSingleBoard = async (id: number): Promise<GetBoardDTO> => {
  return httpClient.get<GetBoardDTO>(`/board/${id}`);
};

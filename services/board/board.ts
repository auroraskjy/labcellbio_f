import { httpClient } from "../http-client";
import {
  CreateBoardRequest,
  CreateBoardResponse,
  GetBoardDTO,
  GetBoardResponse,
} from "./types";

export const getBoardList = async (): Promise<GetBoardResponse> => {
  return httpClient.get<GetBoardResponse>("/board");
};

export const createBoard = async (
  request: CreateBoardRequest
): Promise<CreateBoardResponse> => {
  return httpClient.post<CreateBoardResponse>("/board", request);
};

export const getSingleBoard = async (id: number): Promise<GetBoardDTO> => {
  return httpClient.get<GetBoardDTO>(`/board/${id}`);
};

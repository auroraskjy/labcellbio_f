import { httpClient } from "./http-client";

interface LoginResponse {
  message: string;
  user: {
    id: number;
    username: string;
    createdAt: string;
  };
}

export const postLogin = (
  username: string,
  password: string
): Promise<LoginResponse> => {
  return httpClient.post<LoginResponse>("/auth/login", {
    username,
    password,
  });
};

interface LogoutResponse {
  message: string;
}

export const getLogout = (): Promise<LogoutResponse> => {
  return httpClient.get<LogoutResponse>("/auth/logout");
};

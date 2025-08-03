import { cookies } from "next/headers";
import { FetchOptions, httpClient } from "./http-client";

interface APIResponse {
  message: string;
}

interface LoginResponse extends APIResponse {
  accessToken: string;
  user: {
    id: number;
    username: string;
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

export const getLogout = async (): Promise<APIResponse> => {
  (await cookies()).delete("accessToken");

  return httpClient.get<APIResponse>("/auth/logout");
};

interface AuthStatusResponse {
  loggedIn: boolean;
  user: {
    id: number;
    username: string;
    createdAt: string;
  } | null;
}

export const getAuthStatus = async (): Promise<AuthStatusResponse> => {
  try {
    const accessToken = (await cookies()).get("accessToken");
    const options: FetchOptions = {};

    if (accessToken?.value) {
      options.headers = {
        Authorization: `Bearer ${accessToken.value}`,
      };
    }

    return await httpClient.get<AuthStatusResponse>("/auth/status", options);
  } catch (error) {
    const accessToken = (await cookies()).get("accessToken")?.value;
    if (accessToken) {
      (await cookies()).delete("accessToken");
    }

    return {
      loggedIn: false,
      user: null,
    } as AuthStatusResponse;
  }
};

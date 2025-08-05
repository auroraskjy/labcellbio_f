"use server";

import { FormState, SigninFormSchema } from "@/lib/auth/auth-valid";

import { httpClient } from "@/services/http-client";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface LoginResponse {
  message: string;
  accessToken: string;
  user: {
    id: number;
    username: string;
  };
}

export async function signin(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = SigninFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  // form validation
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      errors: {
        username: fieldErrors.username?.[0],
        password: fieldErrors.password?.[0],
      },
      message: "입력 정보를 확인해 주세요.",
    };
  }

  try {
    const cookieStore = await cookies();

    const response = await httpClient.post<LoginResponse>("/auth/login", {
      username: parsed.data.username,
      password: parsed.data.password,
    });

    const { accessToken } = response;
    cookieStore.set("accessToken", accessToken);
    revalidateTag("auth-status");

    return {
      message: "로그인 성공!",
    };
  } catch (err: unknown) {
    const { message } = JSON.parse((err as Error).message);

    return {
      errors: {
        message,
      },
    };
  }
}

interface AuthStatusResponse {
  loggedIn: boolean;
  user: {
    id: number;
    username: string;
    createdAt: string;
  } | null;
}

export async function getAuthStatus() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    return httpClient.get<AuthStatusResponse>("/auth/status", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        tags: ["auth-status"],
        revalidate: 0,
      },
      cache: "no-store",
    });
  } catch (error) {
    if (accessToken) {
      cookieStore.delete("accessToken");
    }

    return {
      loggedIn: false,
      user: null,
    } as AuthStatusResponse;
  }
}

export async function signout() {
  const cookieStore = await cookies();

  try {
    await httpClient.get<{ message: string }>("/auth/logout");
  } catch (error) {
    console.error("서버 로그아웃 실패:", error);
  } finally {
    cookieStore.delete("accessToken");
  }

  redirect("/");
}

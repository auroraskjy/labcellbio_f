"use server";

import { FormState, SigninFormSchema } from "@/lib/auth/auth-valid";

import { getLogout, postLogin } from "@/services/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
    const response = await postLogin(
      parsed.data.username,
      parsed.data.password
    );

    const { accessToken } = response;
    (await cookies()).set("accessToken", accessToken);

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

export async function signout() {
  try {
    await getLogout();
  } catch (error) {
    console.error("서버 로그아웃 실패:", error);
  } finally {
    (await cookies()).delete("accessToken");
  }

  redirect("/");
}

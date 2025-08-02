import { z } from "zod";

export const SigninFormSchema = z.object({
  username: z.string().min(1, { message: "아이디를 입력해 주세요." }),
  password: z.string().min(1, { message: "비밀번호를 입력해 주세요." }),
});

export type FormState =
  | {
      errors?: {
        [key: string]: string | undefined;
      };
      message?: string;
    }
  | undefined;

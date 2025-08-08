"use client";

import { signin } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const [state, action, pending] = useActionState(signin, undefined);
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const errors = Object.values(state?.errors || {});
    const hasErrors = errors.length > 0;

    if (hasErrors) {
      console.log(errors);

      errors.forEach((error) => {
        toast.error(error, {
          duration: 3000,
        });
      });
      // 로그인 실패 시 username 필드에 포커스
      usernameRef.current?.focus();
    }
  }, [state]);

  return (
    <form action={action} className="flex flex-col gap-3">
      {/* body */}
      <div>
        <label htmlFor="username" className="sr-only">
          아이디
        </label>
        <Input
          ref={usernameRef}
          id="username"
          name="username"
          placeholder="아이디"
        />
      </div>

      <div>
        <label htmlFor="password" className="sr-only">
          비밀번호
        </label>
        <Input
          id="password"
          name="password"
          placeholder="패스워드"
          type="password"
        />
      </div>

      <Button
        type="submit"
        loading={pending}
        disabled={pending}
        className="w-full h-13.5"
      >
        로그인
      </Button>
    </form>
  );
}

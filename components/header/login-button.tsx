"use client";

import { signin } from "@/actions/auth";
import { LoginIcon } from "@/components/icons/login-icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function LoginButton() {
  const [state, action, pending] = useActionState(signin, undefined);
  const [isOpen, setIsOpen] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const errors = Object.values(state?.errors || {});
    const hasErrors = errors.length > 0;

    if (hasErrors) {
      errors.forEach((error) => {
        toast.error(error, {
          duration: 3000,
        });
      });
      // 로그인 실패 시 username 필드에 포커스
      usernameRef.current?.focus();
    } else if (state && !hasErrors) {
      setIsOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          aria-label="로그인"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >
          <LoginIcon className="size-[16px]" aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
        {/* Header */}
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>

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
              placeholder="비밀번호"
              type="password"
            />
          </div>

          {/* footer */}
          <DialogFooter className="flex flex-row gap-2 justify-end">
            <DialogClose asChild className="w-fit">
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              loading={pending}
              disabled={pending}
              className="w-[70px]"
            >
              Login
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

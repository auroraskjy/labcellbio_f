"use client";

import { PropsWithChildren } from "react";

interface Props {
  label: string;
  isRequired?: boolean;
}

type InputGroupProps = PropsWithChildren<Props>;

export default function InputGroup({
  label,
  isRequired = false,
  children,
}: InputGroupProps) {
  return (
    <div className="space-y-4 w-full">
      <label className="flex items-center gap-1 text-sm text-gray-700 font-medium">
        <span>{label}</span>
        {isRequired && <span className="leading-0 mt-1">*</span>}
      </label>
      {children}
    </div>
  );
}

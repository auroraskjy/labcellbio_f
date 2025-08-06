"use client";

import { PropsWithChildren } from "react";

interface Props {
  label: string;
  isRequired?: boolean;
}

type FieldSetProps = PropsWithChildren<Props>;

export default function FieldSet({
  label,
  isRequired = false,
  children,
}: FieldSetProps) {
  return (
    <div className="space-y-2 w-full">
      <label className="flex items-center gap-1 text-sm text-gray-700 font-medium">
        <span>{label}</span>
        {isRequired && <span className="leading-0 mt-1">*</span>}
      </label>

      {children}
    </div>
  );
}

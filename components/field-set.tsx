import { ReactNode } from "react";

interface FieldSetProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  isRequired?: boolean;
  children: ReactNode;
}

export default function FieldSet({
  children,
  label,
  isRequired,
  ...props
}: FieldSetProps) {
  return (
    <div className="space-y-2 w-full" {...props}>
      <label className="flex items-center gap-1 text-sm text-gray-700 font-medium">
        <span>{label}</span>
        {isRequired && <span className="leading-0 mt-1">*</span>}
      </label>

      {children}
    </div>
  );
}

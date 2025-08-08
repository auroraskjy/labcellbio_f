import { Info } from "lucide-react";
import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface FieldSetProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  isRequired?: boolean;
  children: ReactNode;
  tooltipDesc?: string;
}

export default function FieldSet({
  children,
  label,
  isRequired,
  tooltipDesc,
  ...props
}: FieldSetProps) {
  return (
    <div className="space-y-2 w-full" {...props}>
      <label className="flex items-center gap-1 text-sm text-gray-700 font-medium">
        <span>{label}</span>
        {isRequired && <span className="leading-0 mt-1">*</span>}

        {tooltipDesc && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground cursor-help hidden lg:block" />
            </TooltipTrigger>
            <TooltipContent align="center">
              <div
                dangerouslySetInnerHTML={{
                  __html: tooltipDesc.replace(/<br\s*\/?>/gi, "<br />"),
                }}
              />
            </TooltipContent>
          </Tooltip>
        )}
      </label>

      {children}
    </div>
  );
}

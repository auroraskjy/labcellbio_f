"use client";

import { Info } from "lucide-react";
import { PropsWithChildren } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface Props {
  label: string;
  isRequired?: boolean;
  tooltipDesc?: string;
}

type InputGroupProps = PropsWithChildren<Props>;

export default function InputGroup({
  label,
  isRequired = false,
  tooltipDesc,
  children,
}: InputGroupProps) {
  return (
    <div className="space-y-4 w-full">
      <label className="flex items-center gap-1 text-sm text-gray-700 font-medium">
        <span>{label}</span>
        {isRequired && <span className="leading-0 mt-1">*</span>}

        {tooltipDesc && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground cursor-help hidden lg:block" />
            </TooltipTrigger>
            <TooltipContent>
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

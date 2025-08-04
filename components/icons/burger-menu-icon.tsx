import * as React from "react";

export const BurgerMenuIcon = React.memo(
  ({
    className,
    width = 20,
    height = 20,
    strokeWidth = 2,
    ...props
  }: React.SVGProps<SVGSVGElement> & { strokeWidth?: number }) => {
    return (
      <svg
        width={width}
        height={height}
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path d="M4 18L20 18" strokeLinecap="round" />
        <path d="M4 12L20 12" strokeLinecap="round" />
        <path d="M4 6L20 6" strokeLinecap="round" />
      </svg>
    );
  }
);

BurgerMenuIcon.displayName = "BurgerMenuIcon";

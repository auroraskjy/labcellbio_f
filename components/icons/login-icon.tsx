import * as React from "react";

export const LoginIcon = React.memo(
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
        viewBox="0 0 499.1 499.1"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g>
          <g>
            <g>
              <path
                d="M0,249.6c0,9.5,7.7,17.2,17.2,17.2h327.6l-63.9,63.8c-6.7,6.7-6.7,17.6,0,24.3c3.3,3.3,7.7,5,12.1,5s8.8-1.7,12.1-5
                l93.1-93.1c6.7-6.7,6.7-17.6,0-24.3l-93.1-93.1c-6.7-6.7-17.6-6.7-24.3,0c-6.7,6.7-6.7,17.6,0,24.3l63.8,63.8H17.2
                C7.7,232.5,0,240.1,0,249.6z"
                strokeWidth="15"
              />
              <path
                d="M396.4,494.2c56.7,0,102.7-46.1,102.7-102.8V107.7C499.1,51,453,4.9,396.4,4.9H112.7C56,4.9,10,51,10,107.7V166
                c0,9.5,7.7,17.1,17.1,17.1c9.5,0,17.2-7.7,17.2-17.1v-58.3c0-37.7,30.7-68.5,68.4-68.5h283.7c37.7,0,68.4,30.7,68.4,68.5v283.7
                c0,37.7-30.7,68.5-68.4,68.5H112.7c-37.7,0-68.4-30.7-68.4-68.5v-57.6c0-9.5-7.7-17.2-17.2-17.2S10,324.3,10,333.8v57.6
                c0,56.7,46.1,102.8,102.7,102.8H396.4L396.4,494.2z"
                strokeWidth="15"
              />
            </g>
          </g>
        </g>
      </svg>
    );
  }
);

LoginIcon.displayName = "LoginIcon";

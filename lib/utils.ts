import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 * 주어진 파일 이름 앞에 현재 시각(YYYYMMDDHHMMSS)을 붙여 반환합니다.
 *
 * @param originalName - 원본 파일 이름
 * @returns 타임스탬프가 붙은 새로운 파일 이름
 */
export function getFilenameWithTimestamp(originalName: string): string {
  const now = new Date();

  // 한 자리 숫자를 두 자리로 패딩
  const pad = (n: number): string => n.toString().padStart(2, "0");

  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hour = pad(now.getHours());
  const minute = pad(now.getMinutes());
  const second = pad(now.getSeconds());

  const timestamp = `${year}${month}${day}${hour}${minute}${second}`;

  return `${timestamp}_${originalName}`;
}

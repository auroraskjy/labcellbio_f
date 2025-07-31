"use client";

import * as React from "react";

/**
 * Throttle 함수 타입 정의
 */
type ThrottleFunction<T extends (...args: any[]) => any> = {
  (this: ThisParameterType<T>, ...args: Parameters<T>): void;
  cancel: () => void;
  flush: () => void;
};

/**
 * Throttle 함수를 생성하는 유틸리티 함수
 * 지정된 시간 간격 내에 함수가 한 번만 실행되도록 제한합니다.
 */
function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ThrottleFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let lastExecTime = 0;
  let lastArgs: Parameters<T> | undefined;
  let lastThis: ThisParameterType<T>;

  const throttled = function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ) {
    const now = Date.now();
    const timeSinceLastExec = now - lastExecTime;

    lastArgs = args;
    lastThis = this;

    if (timeSinceLastExec >= wait) {
      // 대기 시간이 지났으면 즉시 실행
      lastExecTime = now;
      func.apply(lastThis, lastArgs);
    } else if (!timeoutId) {
      // 대기 시간이 지나지 않았고 타이머가 없으면 타이머 설정
      timeoutId = setTimeout(() => {
        lastExecTime = Date.now();
        timeoutId = undefined;
        if (lastArgs) {
          func.apply(lastThis, lastArgs);
        }
      }, wait - timeSinceLastExec);
    }
  };

  // 타이머 취소 함수
  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  // 즉시 실행 함수 (대기 중인 호출이 있다면)
  throttled.flush = () => {
    if (timeoutId && lastArgs) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
      lastExecTime = Date.now();
      func.apply(lastThis, lastArgs);
    }
  };

  return throttled;
}

/**
 * React 훅으로 throttled 콜백 함수를 생성합니다.
 *
 * @param callback - throttling을 적용할 함수
 * @param wait - throttle 간격 (밀리초)
 * @param deps - 의존성 배열 (useCallback과 동일)
 * @returns throttled 함수 (cancel, flush 메서드 포함)
 *
 * @example
 * ```tsx
 * const handleScroll = useThrottledCallback(() => {
 *   console.log('Scroll event throttled')
 * }, 200)
 *
 * // 취소
 * handleScroll.cancel()
 *
 * // 즉시 실행
 * handleScroll.flush()
 * ```
 */
export function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  wait: number,
  deps: React.DependencyList = []
): ThrottleFunction<T> {
  const callbackRef = React.useRef(callback);

  // 최신 콜백 함수를 ref에 저장
  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // throttled 함수를 메모이제이션
  const throttledCallback = React.useMemo(() => {
    return throttle((...args: Parameters<T>) => {
      callbackRef.current(...args);
    }, wait);
  }, [wait, ...deps]);

  return throttledCallback;
}

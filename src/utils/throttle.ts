export function throttle(func: (...args: any[]) => void, ms: number) {
  let throttled = false;

  return (...args: any[]) => {
    if (!throttled) {
      throttled = true;
      setTimeout(() => {
        func(...args);
        throttled = false;
      }, ms);
    }
  };
}

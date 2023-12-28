export const debounce = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number,
) => {
  let timerId: NodeJS.Timeout;

  return (...args: T) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

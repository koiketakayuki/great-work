export function find<T>(arr: T[], func: (element: T) => boolean): T | undefined {
  for (const e of arr) {
    if (func(e)) {
      return e;
    }
  }

  return undefined;
}

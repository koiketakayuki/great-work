export function find<T>(arr: T[], func: (element: T) => boolean): T | undefined {
  for (const e of arr) {
    if (func(e)) {
      return e;
    }
  }

  return undefined;
}

export function range(from: number, to: number): number[] {
  const result = [];
  for (let i = from; i <= to; i = i + 1) {
    result.push(i);
  }

  return result;
}

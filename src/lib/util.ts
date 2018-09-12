export function find<T>(arr: T[], func: (element: T) => boolean): T | undefined {
  for (const e of arr) {
    if (func(e)) {
      return e;
    }
  }

  return undefined;
}

export function findIndex<T>(arr: T[], func: (element: T) => boolean): number {
  let result: number = 0;
  for (const e of arr) {
    if (func(e)) {
      return result;
    }

    result = result + 1;
  }

  return -1;
}

export function replace<T>(arr: T[], index: number, element: T): T[] {
  const result: T[] = [];

  for (let i = 0; i < arr.length; i = i + 1) {
    if (i !== index) {
      const e: T = arr[i];
      result.push(e);
    } else {
      result.push(element);
    }
  }

  return result;
}

export function range(from: number, to: number): number[] {
  const result = [];
  for (let i = from; i <= to; i = i + 1) {
    result.push(i);
  }

  return result;
}

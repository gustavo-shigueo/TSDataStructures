function swap<T>(arr: T[], i: number, j: number): void {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function partition(arr: number[], start: number, end: number): number {
  const pivot = Math.floor((start + end) / 2);
  const value = arr[pivot];
  let index = start - 1;

  swap(arr, pivot, end);

  for (let i = start; i < end; ++i) {
    if (arr[i] <= value) {
      swap(arr, i, ++index);
    }
  }

  swap(arr, ++index, end);
  return index;
}

function qs(arr: number[], start: number, end: number): void {
  if (start >= end) {
    return;
  }

  const pivot = partition(arr, start, end);
  qs(arr, start, pivot - 1);
  qs(arr, pivot + 1, end);
}

export default function quick_sort(arr: number[]): void {
  qs(arr, 0, arr.length - 1);
}

// [9, 3, 7, 4, 69, 420, 42]
// 0, 6
//
// i = 3
// p = 4
//
//
// [3, 9, 7, 4, 69, 420, 42]
// 0, 2
//
// i = 0
// p = 3
//
//
// [3, 9, 7, 4, 69, 420, 42]
// 2, 2

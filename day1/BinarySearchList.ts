export default function bs_list(haystack: number[], needle: number): boolean {
  let left = 0;
  let right = haystack.length;

  while (left < right) {
    const index = (left + right) >> 1;
    const value = haystack[index];
    if (value === needle) return true;

    if (value > needle) {
      right = index;
    } else {
      left = index + 1;
    }
  }

  return false;
}

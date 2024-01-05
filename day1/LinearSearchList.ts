export default function linear_search(
  haystack: number[],
  needle: number,
): boolean {
  const length = haystack.length;

  for (let i = 0; i < length; ++i) {
    if (haystack[i] === needle) {
      return true;
    }
  }

  return false;
}

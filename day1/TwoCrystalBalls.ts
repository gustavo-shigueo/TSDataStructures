export default function two_crystal_balls(breaks: boolean[]): number {
  const length = breaks.length;
  let step = Math.ceil((Math.sqrt(8 * length + 1) - 1) / 2);
  let index = step;

  while (true) {
    if (index >= length || breaks[index]) {
      break;
    }

    index += --step;
  }

  for (let i = index - step; i < length && i < index; ++i) {
    if (breaks[i]) return i;
  }

  return -1;
}

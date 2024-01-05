import Queue from "./Queue";

export default function bfs(
  graph: WeightedAdjacencyMatrix,
  source: number,
  needle: number,
): number[] | null {
  const LENGTH = graph.length;

  const queue = new Queue<number>();
  const prev = new Array<number>(LENGTH).fill(-1);
  const seen = new Array(LENGTH).fill(false);

  queue.enqueue(source);

  while (queue.length > 0) {
    const current = queue.deque()!;

    if (current === needle) {
      break;
    }

    seen[current] = true;
    const edges = graph[current];

    for (let to = 0; to < LENGTH; ++to) {
      if (to === current || seen[to]) {
        continue;
      }

      if (edges[to] === 0) {
        continue;
      }

      prev[to] = current;
      queue.enqueue(to);
    }
  }

  if (prev[needle] === -1) {
    return null;
  }

  const path: number[] = [];
  let current = needle;

  path.push(needle);
  while (current !== source) {
    path.push(prev[current]);
    current = prev[current];
  }

  return path.reverse();
}

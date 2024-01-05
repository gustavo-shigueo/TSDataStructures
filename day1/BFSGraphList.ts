import Queue from "./Queue";

export default function bfs(
  graph: WeightedAdjacencyList,
  source: number,
  needle: number,
): number[] | null {
  const LENGTH = graph.length;

  const queue = new Queue<number>();
  const seen = new Array<boolean>(LENGTH).fill(false)
  const prev = new Array<number>(LENGTH).fill(-1);

  queue.enqueue(source);

  while (queue.length > 0) {
    const current = queue.deque()!;

    if (current === needle) {
      break;
    }

    seen[current] = true

    const edges = graph[current];

    for (const edge of edges) {
      if (seen[edge.to]) {
        continue
      }

      prev[edge.to] = current;
      queue.enqueue(edge.to);
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

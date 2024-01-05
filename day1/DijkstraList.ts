import MinHeap from "./MinHeap";

export default function dijkstra_list(
  source: number,
  needle: number,
  graph: WeightedAdjacencyList,
): number[] {
  const LENGTH = graph.length;

  const queue = new MinHeap<number>();
  const prev = new Array<number>(LENGTH).fill(-1);
  const distances = new Array<number>(LENGTH).fill(Infinity);

  distances[source] = 0;
  queue.insert(0, source);

  while (queue.length > 0) {
    const current = queue.delete();

    if (current === needle) {
      break;
    }

    const edges = graph[current];

    for (const edge of edges) {
      const distance = distances[current] + edge.weight;

      if (distances[edge.to] <= distance) {
        continue;
      }

      distances[edge.to] = distance;
      prev[edge.to] = current;
      queue.insert(distance, edge.to);
    }
  }

  const path: number[] = [];

  if (prev[needle] === -1) {
    return path;
  }

  let current = needle;

  path.push(needle);
  while (current !== source) {
    path.push(prev[current]);
    current = prev[current];
  }

  return path.reverse();
}

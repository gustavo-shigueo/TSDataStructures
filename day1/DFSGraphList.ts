function search(
  graph: WeightedAdjacencyList,
  current: number,
  needle: number,
  path: number[],
  seen: boolean[],
): boolean {
  if (seen[current]) {
    return false;
  }

  seen[current] = true;
  path.push(current);

  if (current === needle) {
    return true;
  }

  const edges = graph[current];
  for (const edge of edges) {
    if (seen[edge.to]) {
      continue;
    }

    const found = search(graph, edge.to, needle, path, seen);
    if (found) {
      return true;
    }
  }

  path.pop();

  return false;
}

export default function dfs(
  graph: WeightedAdjacencyList,
  source: number,
  needle: number,
): number[] | null {
  const seen = new Array(graph.length).fill(false);
  const path: number[] = [];

  const found = search(graph, source, needle, path, seen);
  return found ? path : null;
}

const DIRECTIONS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
] as const;

function walk(
  maze: string[],
  wall: string,
  current: Point,
  end: Point,
  path: Point[],
  seen: boolean[][],
): boolean {
  if (
    current.x < 0 ||
    current.x >= maze[0].length ||
    current.y < 0 ||
    current.y >= maze.length
  ) {
    return false;
  }

  if (maze[current.y][current.x] === wall) {
    return false;
  }

  if (current.x === end.x && current.y === end.y) {
    path.push(end);
    return true;
  }

  if (seen[current.y][current.x]) {
    return false;
  }

  path.push(current);
  seen[current.y][current.x] = true;

  for (let i = 0; i < DIRECTIONS.length; ++i) {
    const [x, y] = DIRECTIONS[i];
    const found = walk(
      maze,
      wall,
      { x: current.x + x, y: current.y + y },
      end,
      path,
      seen,
    );

    if (found) {
      return true;
    }
  }

  path.pop();

  return false;
}

export default function solve(
  maze: string[],
  wall: string,
  start: Point,
  end: Point,
): Point[] {
  const path: Point[] = [];
  const seen = new Array<boolean[]>(maze.length);

  for (let i = 0; i < seen.length; ++i) {
    seen[i] = new Array<boolean>(maze[0].length);
    seen[i].fill(false);
  }

  walk(maze, wall, start, end, path, seen);

  return path;
}

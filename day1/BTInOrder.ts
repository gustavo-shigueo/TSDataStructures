function traverse<T>(current: BinaryNode<T> | null, path: T[]): T[] {
  if (!current) return path;

  traverse(current.left, path);
  path.push(current.value);
  traverse(current.right, path);

  return path;
}

export default function in_order_search<T>(head: BinaryNode<T>): T[] {
  return traverse(head, []);
}

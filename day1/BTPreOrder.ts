function traverse<T>(current: BinaryNode<T> | null, path: T[]): T[] {
  if (!current) return path;

  path.push(current.value);
  traverse(current.left, path);
  traverse(current.right, path);

  return path;
}

export default function pre_order_search<T>(head: BinaryNode<T>): T[] {
  return traverse(head, []);
}

function traverse<T>(current: BinaryNode<T> | null, path: T[]): T[] {
  if (!current) return path;

  traverse(current.left, path);
  traverse(current.right, path);
  path.push(current.value);

  return path;
}

export default function post_order_search<T>(head: BinaryNode<T>): T[] {
  return traverse(head, []);
}

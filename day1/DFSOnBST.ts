function search<T>(current: BinaryNode<T> | null, needle: T): boolean {
  if (!current) {
    return false;
  }

  if (current.value === needle) {
    return true;
  }

  if (needle < current.value) {
    return search(current.left, needle);
  }

  return search(current.right, needle);
}

export default function dfs<T>(head: BinaryNode<T>, needle: T): boolean {
  return search(head, needle);
}

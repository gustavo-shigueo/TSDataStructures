function traverseBoth<T>(
  a: BinaryNode<T> | null,
  b: BinaryNode<T> | null,
): boolean {
  if (!a !== !b) {
    return false;
  }

  if (!a || !b) {
    return true;
  }

  if (a.value !== b.value) {
    return false;
  }

  return traverseBoth(a.left, b.left) && traverseBoth(a.right, b.right);
}

export default function compare<T>(
  a: BinaryNode<T> | null,
  b: BinaryNode<T> | null,
): boolean {
  return traverseBoth(a, b);
}

import Queue from "./Queue";

export default function bfs<T>(head: BinaryNode<T>, needle: T): boolean {
  const queue = new Queue<BinaryNode<T> | null>();

  queue.enqueue(head);
  while (queue.length > 0) {
    const node = queue.deque();
    if (!node) continue;

    if (node.value === needle) {
      return true;
    }

    queue.enqueue(node.left);
    queue.enqueue(node.right);
  }

  return false;
}

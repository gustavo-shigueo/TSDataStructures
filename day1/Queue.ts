class Node<T> {
  public value: T;
  public next: Node<T> | null = null;

  public constructor(value: T) {
    this.value = value;
  }
}

export default class Queue<T> {
  #length = 0;
  #head: Node<T> | null = null;
  #tail: Node<T> | null = null;

  public get length(): number {
    return this.#length;
  }

  public enqueue(item: T): void {
    const node = new Node(item);
    this.#length++;

    if (this.#tail) {
      this.#tail.next = node;
    } else {
      this.#head = node;
    }

    this.#tail = node;
  }

  public deque(): T | undefined {
    if (!this.#head) {
      return undefined;
    }

    this.#length--;

    const node = this.#head;
    this.#head = node.next;
    node.next = null;

    if (!this.#head) {
      this.#tail = null;
    }

    return node.value;
  }

  public peek(): T | undefined {
    return this.#head?.value;
  }
}

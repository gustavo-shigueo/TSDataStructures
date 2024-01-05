class Node<T> {
  public value: T;
  public prev: Node<T> | null = null;

  public constructor(value: T) {
    this.value = value;
  }
}

export default class Stack<T> {
  #length = 0;
  #head: Node<T> | null;

  public get length(): number {
    return this.#length;
  }

  public push(item: T): void {
    const node = new Node(item);

    node.prev = this.#head;
    this.#head = node;
    this.#length++;
  }

  public pop(): T | undefined {
    if (!this.#head) {
      return undefined;
    }

    const node = this.#head;
    this.#head = node.prev;
    this.#length--;
    node.prev = null;

    return node.value;
  }

  public peek(): T | undefined {
    return this.#head?.value;
  }
}

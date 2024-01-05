class Node<T> {
  public value: T;
  public next: Node<T> | null = null;
  public prev: Node<T> | null = null;

  public constructor(data: T) {
    this.value = data;
  }
}

export default class DoublyLinkedList<T> {
  #length = 0;
  #head: Node<T> | null = null;
  #tail: Node<T> | null = null;

  public get length(): number {
    return this.#length;
  }

  public prepend(item: T): void {
    const node = new Node(item);
    node.next = this.#head;

    if (this.#length === 0) {
      this.#tail = node;
    }

    this.#head = node;
    this.#length++;
  }

  public insertAt(item: T, idx: number): void {
    if (idx < 0 || idx > this.#length) {
      throw new Error("Index out of bounds");
    }

    if (idx === 0 || this.#length === 0) {
      return this.prepend(item);
    }

    if (idx === this.#length) {
      return this.append(item);
    }

    const prev = this.#getNode(idx)!;
    const next = prev.next!;
    const node = new Node(item);

    prev.next = node;
    node.prev = prev;

    next.prev = node;
    node.next = next;

    this.#length++;
  }

  public append(item: T): void {
    if (!this.#tail) {
      return this.prepend(item);
    }

    const node = new Node(item);
    node.prev = this.#tail;

    this.#tail.next = node;
    this.#tail = node;
    this.#length++;
  }

  public remove(item: T): T | undefined {
    if (this.#length === 0) {
      return undefined;
    }

    let node = this.#head;
    while (node !== null) {
      if (node.value === item) {
        break;
      }

      node = node.next;
    }

    if (!node) {
      return undefined;
    }

    return this.#removeNode(node);
  }

  public get(idx: number): T | undefined {
    return this.#getNode(idx)?.value;
  }

  public removeAt(idx: number): T | undefined {
    if (this.#length === 0 || idx < 0 || idx >= this.#length) {
      return undefined;
    }

    const node = idx === this.#length - 1 ? this.#tail! : this.#getNode(idx)!;
    return this.#removeNode(node);
  }

  #getNode(idx: number): Node<T> | null {
    if (this.#length === 0 || idx < 0 || idx >= this.#length) {
      return null;
    }

    if (idx === 0) {
      return this.#head;
    }

    if (idx === this.#length - 1) {
      return this.#tail;
    }

    let current = this.#head;
    for (let i = 0; i < idx; ++i) {
      current = current?.next ?? null;
    }

    return current;
  }

  #removeNode(node: Node<T>): T | undefined {
    const prev = node.prev;
    const next = node.next;

    if (prev) {
      prev.next = next;
    } else {
      this.#head = next;
    }

    if (next) {
      next.prev = prev;
    } else {
      this.#tail = prev;
    }

    this.#length--;

    return node.value;
  }
}

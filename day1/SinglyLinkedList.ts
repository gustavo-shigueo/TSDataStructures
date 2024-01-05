class Node<T> {
  public value: T;
  public next: Node<T> | null = null;

  public constructor(value: T) {
    this.value = value;
  }
}

export default class SinglyLinkedList<T> {
  public get length(): number {
    return this.#length;
  }

  #length = 0;
  #head: Node<T> | null = null;
  #tail: Node<T> | null = null;

  public prepend(item: T): void {
    const node = new Node(item);
    node.next = this.#head;
    this.#head = node;

    if (!this.#tail) {
      this.#tail = node;
    }

    this.#length++;
  }

  public insertAt(item: T, idx: number): void {
    if (idx > this.#length || idx < 0) {
      throw new Error("Index out of bounds");
    }

    if (idx === 0) {
      return this.prepend(item);
    }

    if (idx === this.length) {
      return this.append(item);
    }

    const prev = this.#getNode(idx - 1)!;
    const next = prev.next!;
    const node = new Node(item);

    node.next = next;
    prev.next = node;

    this.#length++;
  }

  public append(item: T): void {
    if (!this.#tail) {
      return this.prepend(item);
    }

    const node = new Node(item);

    this.#tail.next = node;
    this.#tail = node;

    this.#length++;
  }

  public remove(item: T): T | undefined {
    if (this.#length === 0) {
      return undefined;
    }

    if (this.#head!.value === item) {
      return this.removeAt(0);
    }

    let prev = this.#head;
    while (prev?.next?.value !== item && prev != null) {
      prev = prev.next;
    }

    if (prev == null) {
      return undefined;
    }

    const node = prev.next!;
    const next = node.next;
    const value = node.value;

    node.next = null;
    prev.next = next;

    this.#length--;

    return value;
  }

  public get(idx: number): T | undefined {
    return this.#getNode(idx)?.value;
  }

  public removeAt(idx: number): T | undefined {
    if (!this.#head || idx >= this.#length || idx < 0) {
      return undefined;
    }

    if (idx === 0) {
      const node = this.#head;
      this.#head = this.#head.next;

      node.next = null;
      if (!this.#head) {
        this.#tail = null;
      }

      this.#length--;

      return node.value;
    }

    const prev = this.#getNode(idx - 1)!;
    const node = prev.next!;
    const next = node.next;

    node.next = null;

    if (!prev) {
      this.#head = this.#head.next;
    } else {
      prev.next = next;
    }

    if (!next) {
      this.#tail = prev;
    }

    this.#length--;
    return node?.value;
  }

  #getNode(idx: number): Node<T> | null {
    if (idx < 0 || idx >= this.#length) {
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
}

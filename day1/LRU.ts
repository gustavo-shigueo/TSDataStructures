import Map from "./Map";

class Node<K, V> {
  public next: Node<K, V> | null = null;
  public prev: Node<K, V> | null = null;

  public constructor(public key: K, public value: V) {}
}

export default class LRU<K, V> {
  #capacity: number;

  #head: Node<K, V> | null = null;
  #tail: Node<K, V> | null = null;

  #lookup: Map<K, Node<K, V>> = new Map();

  public constructor(capacity: number = 5) {
    if (!Number.isSafeInteger(capacity) || capacity < 1) {
      throw new Error("Capacity must be an integer larger than zero");
    }

    this.#capacity = capacity;
  }

  public update(key: K, value: V): void {
    const cached = this.#lookup.get(key);

    if (cached) {
      cached.value = value;
      this.#moveNodeToHead(cached);
      return;
    }

    const node = new Node(key, value);

    if (!this.#head || !this.#tail) {
      this.#head = node;
      this.#tail = node;

      return this.#lookup.set(key, node);
    }

    node.next = this.#head;
    this.#head.prev = node;
    this.#head = node;

    if (this.#lookup.size() < this.#capacity) {
      return this.#lookup.set(key, node);
    }

    this.#lookup.delete(this.#tail.key);

    this.#tail = this.#tail.prev;
    if (this.#tail) {
      this.#tail.next = null;
    }

    return this.#lookup.set(key, node);
  }

  public get(key: K): V | undefined {
    if (!this.#head) {
      return undefined;
    }

    const node = this.#lookup.get(key);

    if (!node) {
      return undefined;
    }

    this.#moveNodeToHead(node);

    return node.value;
  }

  #moveNodeToHead(node: Node<K, V>): void {
    const prev = node.prev;
    const next = node.next;

    // Node already is head
    if (!prev) {
      return;
    }

    if (this.#head) {
      this.#head.prev = node;
    }

    node.next = this.#head;
    node.prev = null;

    this.#head = node;

    prev.next = next;

    if (next) {
      next.prev = prev;
    } else {
      this.#tail = prev;
    }
  }
}

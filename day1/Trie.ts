class Node {
  public children = new Array<Node | null>(26).fill(null);
  public childCount = 0;
  public isWord = false;
  public parent: Node | null = null;

  public constructor(public character: string) {}
}

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
const CHAR_CODE_A = "a".charCodeAt(0);

export default class Trie {
  #head = new Node("");

  public insert(item: string): void {
    let current = this.#head;

    for (const character of item.toLowerCase()) {
      const index = this.#getCharachterIndex(character);
      if (!current.children[index]) {
        const node = new Node(character);
        current.children[index] = node;
        current.childCount++;
        node.parent = current;
      }

      current = current.children[index]!;
    }

    current.isWord = true;
  }

  public delete(item: string): void {
    this.#remove(this.#head, item);
  }

  public find(partial: string): string[] {
    const node = this.#search(this.#head, partial);

    if (!node) return [];

    return this.#findWords(node, partial, []);
  }

  #findWords(current: Node, partial: string, strings: string[]): string[] {
    if (current.isWord) {
      strings.push(partial);
    }

    for (let i = 0; i < ALPHABET.length; i++) {
      const child = current.children[i];
      if (!child) {
        continue;
      }

      this.#findWords(child, partial + child.character, strings);
    }

    return strings;
  }

  #search(current: Node | undefined, needle: string): Node | undefined {
    if (!current || needle.length === 0) {
      return current;
    }

    const character = needle[0];
    const index = this.#getCharachterIndex(character);

    if (!current.children[index]) {
      return current;
    }

    return this.#search(current.children[index]!, needle.substring(1));
  }

  #remove(current: Node | null, partial: string) {
    if (!current || (!current.isWord && !partial)) {
      return;
    }

    if (!partial) {
      current.isWord = false;
    }

    const parent = current.parent!;

    if (current.childCount === 0) {
      parent.childCount--;
      parent.children[this.#getCharachterIndex(current.character)] = null;
    }

    if (partial) {
      const character = partial[0];
      const child = current.children[this.#getCharachterIndex(character)];

      this.#remove(child, partial.substring(1));
    }
  }

  #getCharachterIndex(character: string): number {
    return character.charCodeAt(0) - CHAR_CODE_A;
  }
}

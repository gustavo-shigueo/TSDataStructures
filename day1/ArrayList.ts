export default class ArrayList<T> {
  #length = 0;
  #capacity: number;
  #data: T[];

  public constructor(capacity = 5) {
    this.#capacity = capacity;
    this.#data = new Array<T>(this.#capacity);
  }

  public get length(): number {
    return this.#length;
  }

  public prepend(item: T): void {
    const realocate = this.#length === this.#capacity;
    const data = realocate ? new Array(this.#capacity * 2) : this.#data;

    if (realocate) {
      this.#capacity *= 2;
    }

    for (let i = this.#length; i > 0; --i) {
      data[i] = this.#data[i - 1];
    }

    this.#data = data;

    this.#length++;
    this.#data[0] = item;
  }

  public insertAt(item: T, idx: number): void {
    if (!Number.isInteger(idx) || idx < 0 || idx > this.#length) {
      throw new Error("Index out of bounds");
    }

    if (idx === 0) {
      return this.prepend(item);
    }

    if (idx === this.#length) {
      return this.append(item);
    }

    if (this.#length < this.#capacity) {
      for (let i = this.#length++; i > idx; --i) {
        this.#data[i] = this.#data[i - 1];
      }

      this.#data[idx] = item;
      return;
    }

    this.#capacity *= 2;

    const data = new Array(this.#capacity);
    for (let i = 0; i < this.#length; ++i) {
      data[i + (i >= idx ? 1 : 0)] = this.#data[i];
    }

    data[idx] = item;
    this.#data = data;

    this.#length++;
  }

  public append(item: T): void {
    if (this.#length === this.#capacity) {
      this.#capacity *= 2;

      const data = new Array<T>(this.#capacity);
      for (let i = 0; i < this.#length; ++i) {
        data[i] = this.#data[i];
      }
    }

    this.#data[this.#length++] = item;
  }

  public remove(item: T): T | undefined {
    let i = 0;
    for (; i < this.#length; ++i) {
      if (this.#data[i] === item) {
        break;
      }
    }

    if (i === this.#length) {
      return undefined;
    }

    const value = this.#data[i];
    for (; i < this.#length + 1; ++i) {
      this.#data[i] = this.#data[i + 1];
    }

    this.#length--;

    return value;
  }

  public get(idx: number): T | undefined {
    if (!Number.isInteger(idx) || idx < 0 || idx >= this.#length) {
      return undefined;
    }

    return this.#data[idx];
  }

  public removeAt(idx: number): T | undefined {
    if (!Number.isInteger(idx) || idx < 0 || idx >= this.#length) {
      throw new Error("Index out of bounds");
    }

    const value = this.#data[idx];

    for (let i = idx; i < this.#length - 1; ++i) {
      this.#data[i] = this.#data[i + 1];
    }

    this.#length--;
    return value;
  }

  public set(idx: number, value: T): void {
    if (!Number.isInteger(idx) || idx < 0 || idx >= this.#length) {
      throw new Error("Index out of bounds");
    }

    this.#data[idx] = value;
  }

  public swap(i: number, j: number): void {
    const temp = this.#data[i];
    this.#data[i] = this.#data[j];
    this.#data[j] = temp;
  }
}

import ArrayList from "./ArrayList";

const HASH_OFFSET = 2 ** 31 - 1;
const MAX_LOAD_FACTOR = 0.7;
export default class Map<K, V> {
  #capacity = 5;
  #data: ArrayList<ArrayList<[K, V]> | undefined> = new ArrayList(
    this.#capacity,
  );
  #size = 0;

  public constructor() {
    for (let i = 0; i < this.#capacity; ++i) {
      this.#data.append(undefined);
    }
  }

  public get(key: K): V | undefined {
    const bucket = this.#getBucket(key);

    if (!bucket) {
      return undefined;
    }

    const index = this.#findIndex(bucket, key);
    if (index === undefined) {
      return undefined;
    }

    return bucket.get(index)![1];
  }

  public set(key: K, value: V): void {
    let bucket = this.#getBucket(key);

    // Hash collision
    if (bucket) {
      const index = this.#findIndex(bucket, key);

      // Override
      if (index !== undefined) {
        bucket.get(index)![1] = value;
        return;
      }
    }

    this.#size++;

    // Reallocate
    if (this.#loadFactor > MAX_LOAD_FACTOR) {
      const capacity = this.#capacity * 2;
      const data = new ArrayList<ArrayList<[K, V]> | undefined>(capacity);

      for (let i = 0; i < capacity; ++i) {
        data.append(undefined);
      }

      for (let i = 0; i < this.#data.length; ++i) {
        const bucket = this.#data.get(i);

        if (!bucket) {
          continue;
        }

        for (let j = 0; j < bucket.length; ++j) {
          const kv = bucket.get(j)!;

          const index = this.#hash(kv[0]) % capacity;
          const newBucket = data.get(index) ?? new ArrayList(2);

          newBucket.append(kv);

          data.set(index, newBucket);
        }
      }

      this.#data = data;
      this.#capacity = capacity;
    }

    // Add key value pair to map
    const index = this.#hash(key) % this.#capacity;
    bucket = this.#data.get(index);
    if (!bucket) {
      bucket = new ArrayList(2);
      this.#data.set(index, bucket);
    }

    bucket.append([key, value]);
  }

  public delete(key: K): V | undefined {
    const bucket = this.#getBucket(key);
    if (!bucket) {
      return undefined;
    }

    const index = this.#findIndex(bucket, key);
    if (index === undefined) {
      return undefined;
    }

    const value = bucket.get(index)![1];

    this.#size--;
    bucket.removeAt(index);

    return value;
  }

  public size(): number {
    return this.#size;
  }

  get #loadFactor(): number {
    return this.#size / this.#capacity;
  }

  #getBucket(key: K): ArrayList<[K, V]> | undefined {
    const index = this.#hash(key) % this.#capacity;
    return this.#data.get(index);
  }

  #findIndex(bucket: ArrayList<[K, V]>, key: K): number | undefined {
    const length = bucket.length;
    for (let i = 0; i < length; ++i) {
      const kv = bucket.get(i)!;

      if (kv[0] === key) {
        return i;
      }
    }

    return undefined;
  }

  #hash(key: K): number {
    const str = typeof key !== "object" ? key.toString() : JSON.stringify(key);

    let hash = 0;
    if (str.length === 0) return hash;

    for (let i = 0; i < str.length; ++i) {
      const chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }

    return hash + HASH_OFFSET + 1;
  }
}

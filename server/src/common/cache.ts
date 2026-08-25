import { LRUCache } from "lru-cache";

export function createCache<K extends {}, V extends {}>(
  options: LRUCache.Options<K, V, unknown>,
) {
  return new LRUCache<K, V>(options);
}

export type Cache<K extends {}, V extends {}> = ReturnType<
  typeof createCache<K, V>
>;

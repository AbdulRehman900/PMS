import { useEffect, useState } from "react";

// Browser-only demo store: data lives in memory + localStorage, no database.
const listeners = new Map<string, Set<() => void>>();
const cache = new Map<string, unknown>();

function emit(key: string) {
  listeners.get(key)?.forEach((l) => l());
}

export function useDemo<T>(key: string, initial: T): [T, (next: T) => void] {
  const [value, setValue] = useState<T>(() => (cache.has(key) ? (cache.get(key) as T) : initial));

  useEffect(() => {
    if (!cache.has(key)) {
      try {
        const raw = localStorage.getItem("pms:" + key);
        cache.set(key, raw ? JSON.parse(raw) : initial);
      } catch {
        cache.set(key, initial);
      }
    }
    setValue(cache.get(key) as T);
    const l = () => setValue(cache.get(key) as T);
    if (!listeners.has(key)) listeners.set(key, new Set());
    listeners.get(key)!.add(l);
    return () => {
      listeners.get(key)!.delete(l);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const set = (next: T) => {
    cache.set(key, next);
    try {
      localStorage.setItem("pms:" + key, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    emit(key);
  };
  return [value, set];
}

export function resetDemo() {
  Object.keys(localStorage).filter((k) => k.startsWith("pms:")).forEach((k) => localStorage.removeItem(k));
  cache.clear();
  location.reload();
}

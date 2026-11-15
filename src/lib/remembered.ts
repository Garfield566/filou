import { useState } from 'react';

const remembered = new Map<string, unknown>();

/**
 * State that outlives its screen until the page is reloaded: the home tab chosen before a lesson is still chosen
 * when the lesson ends.
 */
export function useRemembered<T>(key: string, initial: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => (remembered.has(key) ? (remembered.get(key) as T) : initial));
  return [
    value,
    (next: T) => {
      remembered.set(key, next);
      setValue(next);
    },
  ];
}

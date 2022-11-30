import { useState, useEffect } from "react";

export type LocalStorageItem =
  | string
  | number
  | boolean
  | null
  | undefined
  | LocalStorageItem[]
  | { [key: string]: LocalStorageItem };

function getStorageValue(key: string, defaultValue: LocalStorageItem) {
  // getting stored value
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    const initial = saved !== null ? JSON.parse(saved) : defaultValue;
    return initial as LocalStorageItem;
  }
}

export const useLocalStorage = <T extends LocalStorageItem>(
  key: string,
  defaultValue: T
) => {
  const [value, setValue] = useState(getStorageValue(key, defaultValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [T, typeof setValue];
};

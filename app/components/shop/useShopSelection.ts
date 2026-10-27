"use client";

import { useEffect, useState } from "react";
import { SHOP_PRODUCTS } from "../../../data/shop";

const KEY = "sweezy-shop-selection-v1";
const CHANGED = "sweezy-shop-selection-changed";
const valid = new Set(SHOP_PRODUCTS.map(product => product.slug));
export function parseShopSelection(raw: string | null): string[] {
  try {
    const record: unknown = JSON.parse(raw ?? "null");
    if (!record || typeof record !== "object" || !("version" in record) || record.version !== 1 || !("items" in record) || !Array.isArray(record.items)) return [];
    return Array.from(new Set(record.items.filter((item): item is string => typeof item === "string" && valid.has(item)))).slice(0, SHOP_PRODUCTS.length);
  } catch { return []; }
}

export function useShopSelection() {
  const [selected, setSelected] = useState<string[]>([]);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const read = () => {
      try { setSelected(parseShopSelection(localStorage.getItem(KEY))); }
      catch { setStorageUnavailable(true); }
      setReady(true);
    };
    const change = (event: Event) => {
      if (event instanceof CustomEvent && Array.isArray(event.detail)) setSelected(event.detail);
    };
    const storage = (event: StorageEvent) => { if (event.key === KEY || event.key === null) read(); };
    read();
    window.addEventListener(CHANGED, change);
    window.addEventListener("storage", storage);
    return () => { window.removeEventListener(CHANGED, change); window.removeEventListener("storage", storage); };
  }, []);

  function save(items: string[]) {
    setSelected(items);
    try { localStorage.setItem(KEY, JSON.stringify({ version: 1, items })); }
    catch { setStorageUnavailable(true); }
    window.dispatchEvent(new CustomEvent(CHANGED, { detail: items }));
  }
  const toggle = (slug: string) => {
    if (!valid.has(slug) || !ready) return;
    save(selected.includes(slug) ? selected.filter(item => item !== slug) : [...selected, slug]);
  };
  return { selected, toggle, clear: () => save([]), ready, storageUnavailable };
}

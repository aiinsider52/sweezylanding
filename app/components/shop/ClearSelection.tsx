"use client";

import { useEffect } from "react";
import { useShopSelection } from "./useShopSelection";

/** Empties the saved selection once, after a completed checkout. */
export function ClearSelection() {
  const { ready, clear } = useShopSelection();
  useEffect(() => { if (ready) clear(); }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

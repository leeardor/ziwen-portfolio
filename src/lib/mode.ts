"use client";

import { useSyncExternalStore } from "react";

// Notes / Index view, site-wide and remembered (docs/design-rules.md §6). Default: Notes.
export type Mode = "notes" | "index";

const KEY = "zw-mode";
const EVENT = "zw-mode-change";

function read(): Mode {
  try {
    return localStorage.getItem(KEY) === "index" ? "index" : "notes";
  } catch {
    return "notes";
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

export function setMode(mode: Mode) {
  try {
    localStorage.setItem(KEY, mode);
  } catch {
    // Private mode or blocked storage: the switch still works for this page view.
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useMode(): Mode {
  return useSyncExternalStore(subscribe, read, () => "notes");
}

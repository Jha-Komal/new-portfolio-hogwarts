import { useSyncExternalStore } from "react";

// Which section of the one-page site is on screen. Written by <ScrollSpy>, read by the top bar
// (to highlight the current section) and the music player (it only plays while "home" is showing).
let active: string | null = "home";
const subs = new Set<() => void>();

export function setActiveSection(id: string | null) {
  if (id === active) return;
  active = id;
  subs.forEach((f) => f());
}

export function useActiveSection(): string | null {
  return useSyncExternalStore(
    (cb) => {
      subs.add(cb);
      return () => {
        subs.delete(cb);
      };
    },
    () => active,
    () => "home",
  );
}

export const SECTION_IDS = ["home", "about", "journey", "projects", "blog", "life", "contact"] as const;

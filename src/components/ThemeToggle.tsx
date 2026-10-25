"use client";

import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";

// the theme lives on <html data-theme>; an inline script in the layout sets it before paint
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";
const getServerSnapshot = (): Theme => "dark";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const next: Theme = theme === "dark" ? "light" : "dark";

  const toggle = () => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`shrink-0 rounded border border-line px-2 py-0.5 text-foreground/80 transition-colors hover:border-green/60 hover:text-amber ${className}`}
    >
      <span aria-hidden>{theme === "dark" ? "☀" : "☾"}</span>
      <span className="ml-1.5 hidden text-xs sm:inline">{theme === "dark" ? "light" : "dark"}</span>
    </button>
  );
}

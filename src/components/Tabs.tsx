"use client";

import { useState, type ReactNode } from "react";

type Item = { id: string; label: string; content: ReactNode };

// Terminal-style tabs so a text-heavy page fits one screen.
export default function Tabs({ items, className = "" }: { items: Item[]; className?: string }) {
  const [active, setActive] = useState(items[0].id);
  const current = items.find((i) => i.id === active) ?? items[0];

  return (
    <section
      className={`flex min-h-0 flex-col rounded-lg border border-line bg-panel ${className}`}
    >
      <div role="tablist" className="flex flex-wrap gap-x-5 gap-y-1 border-b border-line px-5 pt-3">
        {items.map((item) => (
          <button
            key={item.id}
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={item.id === current.id}
            aria-controls={`panel-${item.id}`}
            onClick={() => setActive(item.id)}
            className={`-mb-px border-b-2 pb-2 text-sm transition-colors ${
              item.id === current.id
                ? "border-green text-amber"
                : "border-transparent text-foreground/70 hover:text-amber"
            }`}
          >
            [{item.label}]
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`panel-${current.id}`}
        aria-labelledby={`tab-${current.id}`}
        className="min-h-0 flex-1 overflow-y-auto p-5"
      >
        {current.content}
      </div>
    </section>
  );
}

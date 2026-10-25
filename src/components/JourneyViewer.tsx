"use client";

import { useState } from "react";

type Entry = {
  period: string;
  role: string;
  org: string;
  location: string | null;
  highlights: string[];
};

// Pick a role on the left, read its highlights on the right — keeps the page on one screen.
export default function JourneyViewer({ entries }: { entries: Entry[] }) {
  const [active, setActive] = useState(0);
  const e = entries[active];
  const dense = e.highlights.length > 3; // long roles: two compact columns

  return (
    <div className="grid gap-3 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(19rem,0.9fr)_3fr]">
      <div
        role="tablist"
        aria-orientation="vertical"
        className="flex flex-col gap-2 lg:min-h-0 lg:overflow-y-auto"
      >
        {entries.map((entry, i) => (
          <button
            key={i}
            role="tab"
            id={`journey-tab-${i}`}
            aria-selected={i === active}
            aria-controls="journey-panel"
            onClick={() => setActive(i)}
            className={`rounded-lg border p-3 text-left transition-colors ${
              i === active
                ? "border-green bg-green/5"
                : "border-line bg-panel hover:border-green/60"
            }`}
          >
            <span className="block text-xs uppercase tracking-wide text-green">{entry.period}</span>
            <span className={`mt-1 block text-sm leading-snug ${i === active ? "text-amber" : "text-foreground/85"}`}>
              {entry.role}
            </span>
            <span className="mt-0.5 block text-xs text-foreground/60">{entry.org}</span>
          </button>
        ))}
      </div>

      <section
        role="tabpanel"
        id="journey-panel"
        aria-labelledby={`journey-tab-${active}`}
        className="rounded-lg border border-line bg-panel p-5 lg:min-h-0 lg:overflow-y-auto"
      >
        <p className="text-xs uppercase tracking-wide text-green">
          {e.period}
          {e.location && <span className="text-muted"> · {e.location}</span>}
        </p>
        <h2 className="mt-1 text-xl text-amber">{e.role}</h2>
        <p className="text-sm text-foreground/60">{e.org}</p>
        <ul
          className={`mt-4 text-sm text-foreground/85 ${
            dense
              ? "leading-normal lg:block lg:columns-2 lg:gap-10 lg:text-[0.85rem]"
              : "space-y-3 leading-relaxed lg:text-base"
          }`}
        >
          {e.highlights.map((h) => {
            // "Label: details" -> highlight the label
            const at = h.indexOf(": ");
            const label = dense && at > 0 && at < 40 ? h.slice(0, at) : null;
            return (
              <li key={h} className={dense ? "mb-2 break-inside-avoid" : ""}>
                <span className="text-green" aria-hidden>
                  &gt;{" "}
                </span>
                {label ? (
                  <>
                    <span className="text-amber">{label}:</span> {h.slice(at + 2)}
                  </>
                ) : (
                  h
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

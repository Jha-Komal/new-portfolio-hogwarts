"use client";

import { useEffect, useState } from "react";

const SHOW_MS = 4500;
const FADE_MS = 500;

// A small quote card that cycles through the quotes in a loop, with a fade between them.
// With reduced motion it stays on the first quote.
export default function QuoteRotator({ quotes, author }: { quotes: string[]; author: string }) {
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (quotes.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let swap: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      setVisible(false);
      swap = setTimeout(() => {
        setI((n) => (n + 1) % quotes.length);
        setVisible(true);
      }, FADE_MS);
    }, SHOW_MS);
    return () => {
      clearInterval(id);
      clearTimeout(swap);
    };
  }, [quotes.length]);

  return (
    <figure className="absolute right-6 top-4 hidden w-56 rounded-lg border border-dashed border-sky/50 bg-panel/80 px-3.5 py-2.5 backdrop-blur-sm md:block">
      <blockquote
        className="min-h-[2.6rem] text-sm leading-snug transition-opacity"
        style={{ opacity: visible ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
      >
        “{quotes[i]}”
      </blockquote>
      <figcaption className="mt-1 flex items-center justify-between text-xs text-muted">
        <span aria-hidden className="flex gap-1">
          {quotes.map((_, n) => (
            <span key={n} className={`size-1 rounded-full ${n === i ? "bg-amber" : "bg-muted/40"}`} />
          ))}
        </span>
        — {author}
      </figcaption>
    </figure>
  );
}

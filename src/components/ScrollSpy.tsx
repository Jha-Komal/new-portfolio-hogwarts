"use client";

import { useEffect } from "react";
import { SECTION_IDS, setActiveSection } from "@/lib/spy";

const smooth = () => (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth");

// Home-page behaviour for the one-page layout:
//  - tracks which section is on screen (top bar highlight, music gating) and keeps the URL hash in sync
//  - clicks on any link to "/#section" scroll there instead of navigating
//  - arriving with a hash (e.g. from a detail page's back link) jumps to that section
export default function ScrollSpy() {
  useEffect(() => {
    const compute = () => {
      let cur: string = SECTION_IDS[0];
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 170) cur = id;
        else break;
      }
      setActiveSection(cur);
      const base = location.pathname + location.search;
      const want = cur === "home" ? base : `${base}#${cur}`;
      if (want !== base + location.hash) history.replaceState(history.state, "", want);
    };

    // capture: the page scrolls inside its own container on desktop, and scroll events do not bubble
    document.addEventListener("scroll", compute, { capture: true, passive: true });
    window.addEventListener("resize", compute);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!a || (a.target && a.target !== "_self")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname) return;
      const id = url.hash ? decodeURIComponent(url.hash.slice(1)) : "home";
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: smooth(), block: "start" });
    };
    // capture phase: run before next/link, which would otherwise treat a same-page link as a no-op
    document.addEventListener("click", onClick, true);

    // arrive on a section
    const hash = decodeURIComponent(location.hash.slice(1));
    const t = setTimeout(() => {
      if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: "auto", block: "start" });
      compute();
    }, 150);
    compute();

    return () => {
      clearTimeout(t);
      document.removeEventListener("scroll", compute, { capture: true });
      window.removeEventListener("resize", compute);
      document.removeEventListener("click", onClick, true);
      setActiveSection(null);
    };
  }, []);

  return null;
}

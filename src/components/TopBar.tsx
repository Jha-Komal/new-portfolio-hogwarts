"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import navigation from "@/data/navigation.json";
import profile from "@/data/profile.json";
import ThemeToggle from "./ThemeToggle";

export default function TopBar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="rounded-lg border border-line bg-panel px-4 py-2.5 text-sm">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-5">
          <span className="flex gap-2" aria-hidden>
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
          </span>
          <span className="text-green">
            {profile.handle}@portfolio:~$ <span className="cursor-blink">_</span>
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden gap-6 md:flex" aria-label="Main">
            {navigation.topNav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={
                  isActive(l.href)
                    ? "text-amber"
                    : "text-foreground/80 hover:text-amber"
                }
              >
                [{l.n}] {l.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
      <nav
        className="-mx-1 mt-2 flex gap-4 overflow-x-auto px-1 pt-2 text-xs md:hidden border-t border-line"
        aria-label="Main (mobile)"
      >
        {navigation.topNav.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={isActive(l.href) ? "page" : undefined}
            className={`shrink-0 ${isActive(l.href) ? "text-amber" : "text-foreground/80"}`}
          >
            [{l.n}] {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

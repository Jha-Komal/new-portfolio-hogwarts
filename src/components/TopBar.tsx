"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import navigation from "@/data/navigation.json";
import profile from "@/data/profile.json";
import { useActiveSection } from "@/lib/spy";
import ThemeToggle from "./ThemeToggle";

// "/" -> home, "/#about" -> about
const idOf = (href: string) => (href.includes("#") ? href.split("#")[1] : "home");

export default function TopBar() {
  const pathname = usePathname();
  const section = useActiveSection();
  // on the one-page home the current section is tracked by scroll; detail pages belong to their section
  const current =
    pathname === "/" ? section : pathname.startsWith("/projects") ? "projects" : pathname.startsWith("/blog") ? "blog" : null;
  const isActive = (href: string) => idOf(href) === current;

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
          <nav className="hidden gap-5 lg:flex" aria-label="Main">
            {navigation.topNav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "true" : undefined}
                className={isActive(l.href) ? "text-amber" : "text-foreground/80 hover:text-amber"}
              >
                [{l.n}] {l.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
      <nav
        className="-mx-1 mt-2 flex gap-4 overflow-x-auto border-t border-line px-1 pt-2 text-xs lg:hidden"
        aria-label="Main (mobile)"
      >
        {navigation.topNav.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={isActive(l.href) ? "true" : undefined}
            className={`shrink-0 ${isActive(l.href) ? "text-amber" : "text-foreground/80"}`}
          >
            [{l.n}] {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

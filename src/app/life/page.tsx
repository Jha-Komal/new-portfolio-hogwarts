import type { Metadata } from "next";
import Page from "@/components/Page";
import PageHeader from "@/components/PageHeader";
import life from "@/data/life.json";

export const metadata: Metadata = { title: life.title };

// Life, written as plain lines: one line per entry in src/data/life.json
export default function LifePage() {
  return (
    <>
      <PageHeader command="cat life.txt" title={life.title} subtitle={life.subtitle} />
      <Page>
        <section className="rounded-lg border border-line bg-panel p-6 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
          <ul className="space-y-4 text-base leading-relaxed lg:text-lg">
            {life.entries.map((e) => (
              <li key={e.title} className="flex gap-4">
                <span aria-hidden className="w-8 shrink-0 text-2xl">
                  {e.emoji}
                </span>
                <p>
                  <span className="text-green">{e.category}</span>
                  <span className="text-muted"> / </span>
                  <span className="text-amber">{e.title}</span>
                  <span className="text-muted"> — </span>
                  <span className="text-foreground/85">{e.blurb}</span>
                </p>
              </li>
            ))}
          </ul>
        </section>
      </Page>
    </>
  );
}

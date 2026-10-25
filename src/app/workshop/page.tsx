import type { Metadata } from "next";
import Page from "@/components/Page";
import PageHeader from "@/components/PageHeader";
import Tag from "@/components/Tag";
import workshop from "@/data/workshop.json";

export const metadata: Metadata = { title: workshop.title };

const statusStyle: Record<string, string> = {
  building: "border-amber/50 text-amber",
  shipped: "border-green/50 text-green",
  idea: "border-sky/50 text-sky",
};

export default function WorkshopPage() {
  return (
    <>
      <PageHeader command="ls ~/workshop" title={workshop.title} subtitle={workshop.subtitle} />
      <Page>
        <ul className="grid gap-3 md:grid-cols-2 lg:min-h-0 lg:flex-1 lg:grid-cols-3 lg:grid-rows-1">
          {workshop.items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-4 rounded-lg border border-line bg-panel p-6 lg:min-h-0 lg:overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-5xl" aria-hidden>
                  {item.emoji}
                </span>
                <span
                  className={`rounded border px-2 py-0.5 text-xs uppercase tracking-wide ${statusStyle[item.status] ?? "border-line text-muted"}`}
                >
                  {item.status}
                </span>
              </div>
              <h2 className="text-xl text-amber">{item.title}</h2>
              <p className="flex-1 text-base leading-relaxed text-foreground/80 lg:text-lg">
                {item.blurb}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {item.tags.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Page>
    </>
  );
}

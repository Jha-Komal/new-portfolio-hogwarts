import type { Metadata } from "next";
import Image from "next/image";
import Page from "@/components/Page";
import PageHeader from "@/components/PageHeader";
import life from "@/data/life.json";

export const metadata: Metadata = { title: "Beyond Work" };

export default function BeyondWorkPage() {
  return (
    <>
      <PageHeader command="cd ~/life" title="Beyond Work" subtitle={life.subtitle} />
      <Page>
        <ul className="grid gap-3 sm:grid-cols-2 lg:min-h-0 lg:flex-1 lg:grid-cols-4 lg:grid-rows-1">
          {life.entries.map((e) => (
            <li
              key={e.title}
              className="flex flex-col gap-3 rounded-lg border border-line bg-panel p-5 lg:min-h-0"
            >
              <div className="relative flex h-40 items-center justify-center overflow-hidden rounded border border-line bg-foreground/[0.04] text-6xl lg:h-auto lg:min-h-0 lg:flex-1">
                {e.image ? (
                  <Image
                    src={e.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, 100vw"
                    className="pixelated object-cover"
                  />
                ) : (
                  <span aria-hidden>{e.emoji}</span>
                )}
              </div>
              <p className="text-xs uppercase tracking-wide text-green">{e.category}</p>
              <h2 className="-mt-2 text-lg text-amber">{e.title}</h2>
              <p className="text-sm leading-relaxed text-foreground/80">{e.blurb}</p>
            </li>
          ))}
        </ul>
      </Page>
    </>
  );
}

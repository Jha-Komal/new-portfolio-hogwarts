import type { Metadata } from "next";
import Image from "next/image";
import Page from "@/components/Page";
import PageHeader from "@/components/PageHeader";
import Tabs from "@/components/Tabs";
import about from "@/data/about.json";
import profile from "@/data/profile.json";
import skills from "@/data/skills.json";
import status from "@/data/status.json";

export const metadata: Metadata = { title: about.title };

export default function AboutPage() {
  const tabs = [
    {
      id: "story",
      label: "Story",
      content: (
        <div className="space-y-3 text-sm leading-normal text-foreground/85 lg:text-[0.95rem]">
          {about.story.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-green px-4 py-2 text-sm text-amber transition-colors hover:bg-green/10"
          >
            <span aria-hidden>↓</span> open resume.pdf
          </a>
        </div>
      ),
    },
    {
      id: "principles",
      label: "Principles",
      content: (
        <ul className="grid gap-3 sm:grid-cols-2">
          {about.principles.map((p) => (
            <li key={p.title} className="rounded-md border border-line bg-foreground/[0.03] p-4">
              <h3 className="text-base text-amber">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-snug text-foreground/75">{p.blurb}</p>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "toolkit",
      label: "Toolkit",
      content: (
        <dl className="space-y-4 text-sm">
          {skills.groups.map((g) => (
            <div key={g.category}>
              <dt className="mb-1.5 text-green">
                <span aria-hidden>&gt; </span>
                {g.category}
              </dt>
              <dd className="flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="rounded border border-line px-2 py-0.5 text-xs text-foreground/85"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      id: "now",
      label: "Now & Education",
      content: (
        <div className="grid gap-6 text-sm md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-green">{"// Current status"}</h3>
            <dl className="space-y-1.5">
              {status.map((s) => (
                <div key={s.label} className="flex gap-3">
                  <dt className="w-24 shrink-0 text-green">
                    <span aria-hidden>&gt; </span>
                    {s.label}
                  </dt>
                  <dd className="text-foreground/85">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="mb-2 text-green">{"// Education"}</h3>
            <ul className="space-y-3">
              {about.education.map((e) => (
                <li key={e.title}>
                  <p className="text-amber">{e.title}</p>
                  <p className="text-foreground/70">{e.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader command="cat about-me.txt" title={about.title} subtitle={about.subtitle} />
      <Page>
        <div className="grid gap-3 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(18rem,1fr)_2.4fr]">
          <div className="flex flex-col gap-3 lg:min-h-0">
            <div className="relative h-72 overflow-hidden rounded-lg border border-line lg:h-auto lg:min-h-0 lg:flex-1">
              <Image
                src="/images/komal-portrait.jpeg"
                alt={`Portrait of ${profile.fullName}`}
                fill
                priority
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover object-[55%_25%]"
              />
            </div>
            <dl className="shrink-0 space-y-1.5 rounded-lg border border-line bg-panel p-4 text-sm">
              {profile.about.facts.map((f) => (
                <div key={f.label} className="flex gap-3">
                  <dt className="w-32 shrink-0 text-green">
                    <span aria-hidden>&gt; </span>
                    {f.label}
                  </dt>
                  <dd className="whitespace-pre-line text-foreground/85">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Tabs items={tabs} />
        </div>
      </Page>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import IronMan from "@/components/IronMan";
import Panel from "@/components/Panel";
import Tag from "@/components/Tag";
import profile from "@/data/profile.json";
import projects from "@/data/projects.json";
import skills from "@/data/skills.json";
import status from "@/data/status.json";

const tones: Record<string, string> = {
  green: "text-green border-green/40",
  sky: "text-sky border-sky/40",
  amber: "text-amber border-amber/40",
  muted: "text-muted border-line",
  figma: "text-[#f24e1e] border-[#f24e1e]/40",
};

// The four dashboard cards (About Me, Featured Projects, Skills, Current Status).
// `storyHref` is where "cat about-me.txt" goes: "#story" on the About page, "/about" on the home page.
export default function DashboardCards({ storyHref }: { storyHref: string }) {
  const skillsHref = storyHref.startsWith("#") ? "#skills" : "/#skills";
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
      <div className="grid gap-3 lg:grid-cols-[1fr_1.15fr_1fr]">
        {/* 01 about me */}
        <Panel title="About Me" index="01" prefix=">>" className="flex flex-col">
          <div className="flex gap-4">
            <div className="relative size-24 shrink-0 overflow-hidden rounded border border-line">
              <Image
                src="/images/komal-portrait.jpeg"
                alt={`Portrait of ${profile.fullName}`}
                fill
                priority
                sizes="96px"
                className="object-cover object-[55%_30%]"
              />
            </div>
            <p className="text-sm leading-relaxed text-foreground/85">{profile.about.blurb}</p>
          </div>
          <dl className="mt-4 space-y-1.5 text-sm">
            {profile.about.facts.map((f) => (
              <div key={f.label} className="flex gap-3">
                <dt className="w-28 shrink-0 text-green">
                  <span aria-hidden>&gt; </span>
                  {f.label}
                </dt>
                <dd className="whitespace-pre-line text-foreground/85">{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-auto pt-5">
            <a
              href={storyHref}
              className="flex w-full items-center justify-between rounded-md border border-green px-4 py-2 text-sm text-amber transition-colors hover:bg-green/10"
            >
              <span>
                <span aria-hidden>📁 </span>cat about-me.txt
              </span>
              <span aria-hidden>{storyHref.startsWith("#") ? "↓" : "→"}</span>
            </a>
          </div>
        </Panel>

        {/* 03 featured projects */}
        <Panel title="Featured Projects" index="03">
          <ul className="space-y-3">
            {featured.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group flex items-start gap-3 rounded-md p-1 transition-colors hover:bg-white/[0.03]"
                >
                  <div
                    className="relative h-[4.5rem] w-24 shrink-0 overflow-hidden rounded border border-line"
                    style={{ backgroundImage: `linear-gradient(135deg, ${p.gradient.join(", ")})` }}
                  >
                    {p.image && <Image src={p.image.src} alt="" fill sizes="96px" className="object-cover object-top" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm text-amber">{p.title}</h3>
                    <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-foreground/75">{p.blurb}</p>
                    <ul className="mt-1.5 flex flex-wrap gap-1">
                      {p.tags.slice(0, 2).map((t) => (
                        <li key={t}>
                          <Tag>{t}</Tag>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span aria-hidden className="self-center text-green transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/#projects" className="mt-3 block text-right text-xs text-green hover:text-amber">
            view all projects →
          </Link>
        </Panel>

        {/* 04 skills + 05 current status */}
        <div className="flex flex-col gap-3">
          <Panel title="Skills" index="04" className="shrink-0">
            <ul className="grid grid-cols-5 gap-x-2 gap-y-3 text-center text-[11px] text-foreground/85">
              {skills.highlights.map((s) => {
                const more = s.label.startsWith("More");
                const inner = (
                  <>
                    <span
                      aria-hidden
                      className={`flex size-9 items-center justify-center rounded-md border bg-foreground/[0.03] text-base font-bold transition-colors ${tones[s.tone] ?? "text-foreground border-line"} ${more ? "group-hover:border-green group-hover:text-green" : ""}`}
                    >
                      {s.icon}
                    </span>
                    <span className="leading-tight">{s.label}</span>
                  </>
                );
                return (
                  <li key={s.label}>
                    {more ? (
                      <Link href={skillsHref} className="group flex flex-col items-center gap-1" title="See all skills">
                        {inner}
                      </Link>
                    ) : (
                      <div className="flex flex-col items-center gap-1">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Panel>
          <Panel title="Current Status" index="05" className="relative min-h-[14rem] flex-1">
            <dl className="space-y-1 text-xs lg:text-[13px]">
              {status.map((s) => (
                <div key={s.label} className="flex gap-2">
                  <dt className="w-[6.6rem] shrink-0 text-green">
                    <span aria-hidden>&gt; </span>
                    {s.label}
                  </dt>
                  <dd className="text-foreground/85">{s.value}</dd>
                </div>
              ))}
            </dl>
            {/* Iron Man, on call */}
            <div aria-hidden className="pointer-events-none absolute bottom-2 right-3 hidden items-end gap-1 xl:flex">
              <span className="mb-12 rounded-lg rounded-br-none border border-line bg-panel px-2 py-1 text-[11px] leading-tight text-foreground/85">
                Jarvis,
                <br />
                build faster.
              </span>
              <IronMan className="w-10" />
            </div>
          </Panel>
        </div>
      </div>
  );
}

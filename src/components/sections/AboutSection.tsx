import DashboardCards from "@/components/DashboardCards";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Panel from "@/components/Panel";
import about from "@/data/about.json";
import profile from "@/data/profile.json";
import skills from "@/data/skills.json";

// About: the dashboard cards, then the full story, principles, skills and education
export default function AboutSection() {
  return (
    <Section id="about">
      <PageHeader command="cat about-me.txt" title={about.title} subtitle={about.subtitle} />
      <div className="flex flex-col gap-3 pb-2">
        <DashboardCards storyHref="#story" />

        {/* 02 story: everything is on the page, nothing hidden behind a click */}
        <Panel title="My Story" index="02" prefix=">>" className="scroll-mt-2">
          <div id="story" className="grid gap-x-8 gap-y-3 text-sm leading-relaxed text-foreground/85 lg:grid-cols-3 lg:text-[0.95rem]">
            {about.story.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-md border border-green px-4 py-2 text-sm text-amber transition-colors hover:bg-green/10"
          >
            ↓ open resume.pdf
          </a>
        </Panel>

        {/* 06 principles */}
        <Panel title="Principles" index="06">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {about.principles.map((p, i) => (
              <li key={p.title} className="rounded-md border border-line bg-white/[0.02] p-4">
                <span className="text-xs text-green">0{i + 1}</span>
                <h3 className="mt-1 text-base text-amber">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-snug text-foreground/75">{p.blurb}</p>
              </li>
            ))}
          </ul>
        </Panel>

        {/* 07 skills: the full list, straight from the resume */}
        <Panel title="Skills" index="07" className="scroll-mt-2" id="skills">
          <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {skills.groups.map((g) => (
              <div key={g.category}>
                <dt className="mb-2 text-sm text-green">
                  <span aria-hidden>&gt; </span>
                  {g.category}
                </dt>
                <dd className="flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <span key={item} className="rounded border border-line px-2 py-0.5 text-xs text-foreground/85">
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Panel>

        {/* 08 education + the fellowship */}
        <Panel title="Education & Fellowship" index="08">
          <ul className="grid gap-3 md:grid-cols-2">
            {about.education.map((e, i) => (
              <li
                key={e.title}
                className={`rounded-md border p-4 ${i === about.education.length - 1 ? "border-green/50 bg-green/5" : "border-line"}`}
              >
                <p className="text-base text-amber">{e.title}</p>
                <p className="mt-1 text-sm text-foreground/70">{e.detail}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </Section>
  );
}

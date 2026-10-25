import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ProjectThumb from "@/components/ProjectThumb";
import Section from "@/components/Section";
import Tag from "@/components/Tag";
import projects from "@/data/projects.json";

export default function ProjectsSection() {
  return (
    <Section id="projects">
      <PageHeader
        command="ls ./projects"
        title="Projects"
        subtitle="Problems I've worked on, and what changed because of it."
      />
      <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className="group flex h-full flex-col gap-4 rounded-lg border border-line bg-panel p-4 transition-colors hover:border-green/60"
            >
              <ProjectThumb
                image={p.image?.src ?? null}
                gradient={p.gradient}
                className="h-40 w-full"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
              <div className="flex-1">
                <h2 className="text-base text-amber">{p.title}</h2>
                <p className="mt-2 text-xs leading-relaxed text-foreground/80">{p.blurb}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
              <span className="text-xs text-green group-hover:text-amber">open project →</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

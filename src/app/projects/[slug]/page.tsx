import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Page from "@/components/Page";
import PageHeader from "@/components/PageHeader";
import Panel from "@/components/Panel";
import Tag from "@/components/Tag";
import projects from "@/data/projects.json";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project?.title ?? "Project", description: project?.blurb };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const { image, subImage } = project;

  return (
    <Page scroll>
      <PageHeader
        command={`cat ${project.slug}.md`}
        title={project.title}
        subtitle={project.subtitle}
        back={{ href: "/projects", label: "all projects" }}
      />

      <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-3">
          {image && (
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="h-auto w-full rounded-lg border border-line"
              priority
            />
          )}
          <Panel title="Overview" index="01" prefix=">>">
            <p className="text-sm leading-relaxed text-foreground/85">{project.overview}</p>
          </Panel>
        </div>

        <div className="flex flex-col gap-3">
          <Panel title="Highlights" index="02">
            <ul className="space-y-2 text-sm">
              {project.highlights.map((h) => (
                <li key={h} className="leading-snug text-foreground/85">
                  <span className="text-green" aria-hidden>
                    &gt;{" "}
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Details" index="03">
            <dl className="space-y-2 text-xs">
              <div className="flex gap-3">
                <dt className="w-16 shrink-0 text-green">Type:</dt>
                <dd>{project.role}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-16 shrink-0 text-green">Year:</dt>
                <dd>{project.year}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-16 shrink-0 text-green">Topics:</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {project.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </dd>
              </div>
            </dl>
          </Panel>
          {subImage && (
            <Panel title="Screen" index="04">
              <Image
                src={subImage.src}
                alt={subImage.alt}
                width={subImage.width}
                height={subImage.height}
                className="mx-auto h-auto w-auto max-w-full rounded border border-line"
              />
            </Panel>
          )}
        </div>
      </div>
    </Page>
  );
}

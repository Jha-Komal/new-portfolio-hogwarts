import type { Metadata } from "next";
import Page from "@/components/Page";
import PageHeader from "@/components/PageHeader";
import Panel from "@/components/Panel";
import contact from "@/data/contact.json";
import profile from "@/data/profile.json";

export const metadata: Metadata = { title: contact.title };

export default function ContactPage() {
  return (
    <>
      <PageHeader command="send --owl" title={contact.title} subtitle={contact.subtitle} />
      <Page>
        <div className="grid gap-3 lg:min-h-0 lg:flex-1 lg:grid-cols-2 lg:grid-rows-1">
          <Panel title="Email" index="01" prefix=">>" className="lg:min-h-0">
            <p className="text-sm text-green">
              {contact.availability} · {profile.location}
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 flex items-center justify-between gap-3 rounded-md border border-green px-4 py-4 text-base text-amber transition-colors hover:bg-green/10"
            >
              <span className="break-all">✉ {profile.email}</span>
              <span aria-hidden>→</span>
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-between rounded-md border border-line px-4 py-4 text-base transition-colors hover:border-green/60"
            >
              <span>↓ resume.pdf</span>
              <span aria-hidden>↗</span>
            </a>
          </Panel>
          <Panel title="Elsewhere" index="02" className="lg:min-h-0">
            <ul className="space-y-2">
              {contact.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-md border border-line px-4 py-4 text-base transition-colors hover:border-green/60"
                  >
                    <span className="min-w-0">
                      <span className="text-amber">{l.label}</span>
                      <span className="ml-3 break-all text-sm text-muted">{l.handle}</span>
                    </span>
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </Page>
    </>
  );
}

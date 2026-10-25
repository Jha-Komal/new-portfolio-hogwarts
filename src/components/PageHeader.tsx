import Link from "next/link";

type Props = {
  command: string;
  title: string;
  subtitle?: string;
  back?: { href: string; label: string };
};

export default function PageHeader({ command, title, subtitle, back }: Props) {
  return (
    <section className="shrink-0 rounded-lg border border-line bg-panel px-5 py-4 sm:px-6">
      {back && (
        <Link href={back.href} className="mb-2 inline-block text-xs text-muted hover:text-amber">
          ← {back.label}
        </Link>
      )}
      <p className="text-sm text-green">
        $ {command} <span className="cursor-blink">_</span>
      </p>
      <h1 className="mt-1 font-display text-2xl font-bold leading-tight sm:text-3xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-foreground/80">
          {subtitle}
        </p>
      )}
    </section>
  );
}

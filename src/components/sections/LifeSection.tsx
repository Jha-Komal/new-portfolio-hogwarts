import FlyingHeroes from "@/components/FlyingHeroes";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import life from "@/data/life.json";

// Life, written as plain lines: one line per entry in src/data/life.json
export default function LifeSection() {
  return (
    <Section id="life">
      <PageHeader command="cat life.txt" title={life.title} subtitle={life.subtitle} />
      <div className="relative flex-1 overflow-hidden rounded-lg border border-line bg-panel p-6">
        <FlyingHeroes />
        <ul className="relative z-[1] space-y-4 text-base leading-relaxed lg:text-lg">
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
      </div>
    </Section>
  );
}

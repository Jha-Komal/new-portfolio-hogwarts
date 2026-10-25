type Entry = {
  period: string;
  role: string;
  org: string;
  location: string | null;
  highlights: string[];
};

// Every role laid out on one timeline, newest first: read it by scrolling, nothing to click.
export default function JourneyTimeline({ entries }: { entries: Entry[] }) {
  return (
    <ol className="relative flex flex-col gap-3 lg:pl-5">
      <span aria-hidden className="absolute bottom-2 left-[5px] top-2 hidden w-px bg-line lg:block" />
      {entries.map((e, i) => (
        <li
          key={e.period}
          className="relative grid gap-3 rounded-lg border border-line bg-panel p-4 lg:grid-cols-[minmax(15rem,0.8fr)_3fr] lg:gap-6"
        >
          <span
            aria-hidden
            className={`absolute -left-5 top-5 hidden h-[11px] w-[11px] rounded-full border-2 border-green lg:block ${
              i === 0 ? "bg-green" : "bg-background"
            }`}
          />
          <div>
            <p className="text-xs uppercase tracking-wide text-green">{e.period}</p>
            <h3 className="mt-1 text-base leading-snug text-amber">{e.role}</h3>
            <p className="text-sm text-foreground/60">
              {e.org}
              {e.location && <span className="text-muted"> · {e.location}</span>}
            </p>
          </div>
          <ul className="space-y-2 text-sm leading-relaxed text-foreground/85">
            {e.highlights.map((h) => {
              // "Label: details" -> highlight the label
              const at = h.indexOf(": ");
              const label = at > 0 && at < 40 ? h.slice(0, at) : null;
              return (
                <li key={h}>
                  <span className="text-green" aria-hidden>
                    &gt;{" "}
                  </span>
                  {label ? (
                    <>
                      <span className="text-amber">{label}:</span> {h.slice(at + 2)}
                    </>
                  ) : (
                    h
                  )}
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ol>
  );
}

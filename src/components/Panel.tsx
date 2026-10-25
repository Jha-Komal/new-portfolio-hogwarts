import type { ReactNode } from "react";

type Props = {
  title: string;
  index: string;
  prefix?: string;
  className?: string;
  id?: string;
  children: ReactNode;
};

export default function Panel({
  title,
  index,
  prefix = "//",
  className = "",
  id,
  children,
}: Props) {
  return (
    <section
      id={id}
      className={`relative rounded-lg border border-line bg-panel p-4 ${className}`}
    >
      <span className="absolute left-0 top-0 h-0.5 w-8 bg-green" aria-hidden />
      <header className="mb-4 flex items-center justify-between border-b border-line pb-3 text-xs tracking-wide text-green">
        <h2 className="font-normal uppercase">
          {prefix} {title}
        </h2>
        <span className="text-muted">{index}</span>
      </header>
      {children}
    </section>
  );
}

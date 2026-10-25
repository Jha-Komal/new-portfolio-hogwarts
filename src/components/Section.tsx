import type { ReactNode } from "react";

// One section of the one-page site. Each is at least one screen tall on desktop, so scrolling
// shows one section at a time; `fill` pins it to exactly one screen (for layouts that fill the height).
export default function Section({ id, fill = false, children }: { id: string; fill?: boolean; children: ReactNode }) {
  return (
    <section
      id={id}
      className={`flex flex-col gap-3 ${fill ? "lg:h-[calc(100dvh-90px)]" : "lg:min-h-[calc(100dvh-90px)]"}`}
    >
      {children}
    </section>
  );
}

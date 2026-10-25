import type { ReactNode } from "react";

// Page body inside the fixed-height shell. By default content must fit the
// viewport on desktop; pass `scroll` for the pages that are allowed to scroll.
export default function Page({
  scroll = false,
  children,
}: {
  scroll?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex flex-col gap-3 lg:min-h-0 lg:flex-1 ${
        scroll ? "lg:overflow-y-auto lg:pr-1" : "lg:overflow-hidden"
      }`}
    >
      {children}
    </div>
  );
}

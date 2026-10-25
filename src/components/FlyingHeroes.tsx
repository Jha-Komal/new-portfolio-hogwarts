import Image from "next/image";
import IronMan from "./IronMan";

// Overlay for the Life page (the parent must be `relative`):
// - Harry on his broom flies across the middle of the whole page, forever, behind the text
// - Iron Man hovers in place, seen from the front, in front of everything
export default function FlyingHeroes() {
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden [container-type:inline-size]">
        <div className="fly-harry absolute top-[42%]">
          <Image src="/images/rider.png" alt="" width={56} height={36} unoptimized className="pixelated w-28" />
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute bottom-10 right-12 z-10 hidden md:block">
        <IronMan className="w-14" />
      </div>
    </>
  );
}

import Image from "next/image";
import type { CSSProperties } from "react";

// All coordinates below are in source-image pixels (1280x720) and are turned
// into percentages, so the overlays stay locked to the art at any size.
const W = 1280;
const H = 720;

const rect = (x: number, y: number, w: number, h: number): CSSProperties => ({
  left: `${(x / W) * 100}%`,
  top: `${(y / H) * 100}%`,
  width: `${(w / W) * 100}%`,
  height: `${(h / H) * 100}%`,
});

// clip-path polygon from absolute image points, relative to a box
const polygon = (
  box: { x: number; y: number; w: number; h: number },
  pts: [number, number][],
) =>
  `polygon(${pts
    .map(
      ([x, y]) =>
        `${(((x - box.x) / box.w) * 100).toFixed(1)}% ${(((y - box.y) / box.h) * 100).toFixed(1)}%`,
    )
    .join(", ")})`;

const LAPTOP = { x: 463, y: 488, w: 85, h: 55 };
// inner screen quad; the notch at bottom-left keeps the hand visible
const LAPTOP_CLIP = polygon(LAPTOP, [
  [470, 488],
  [548, 488],
  [538, 543],
  [481, 543],
  [481, 531],
  [463, 527],
  [468, 500],
]);

const CODE_ROWS = [52, 34, 68, 44, 58];

const LANTERNS = [
  { cx: 159, cy: 186, gw: 36, gh: 48, delay: "0s" },
  { cx: 225, cy: 495, gw: 34, gh: 44, delay: "-1.4s" },
];

function Laptop() {
  return (
    <>
      <span className="scene-laptop-glow" style={rect(425, 450, 170, 130)} />
      <div
        className="scene-laptop-screen"
        style={{ ...rect(LAPTOP.x, LAPTOP.y, LAPTOP.w, LAPTOP.h), clipPath: LAPTOP_CLIP }}
      >
        {CODE_ROWS.map((w, i) => (
          <i
            key={i}
            className={`scene-code-row ${i === CODE_ROWS.length - 1 ? "scene-code-cursor" : ""}`}
            style={
              {
                top: `${14 + i * 17}%`,
                left: `${i % 2 ? 22 : 14}%`,
                "--w": `${w}%`,
                animationDelay: `${-i * 1.3}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </>
  );
}

// Owl and steam are cut out of the art (public/images/owl.png, steam.png) and
// the base scene has them painted out, so they can move freely.
const OWL = { x: 984, y: 159, w: 162, h: 94 };
const STEAM = { x: 639, y: 518, w: 29, h: 42 };

function Owl() {
  const sprite = { backgroundImage: "url(/images/owl.png)" };
  return (
    <div className="scene-owl" style={rect(OWL.x, OWL.y, OWL.w, OWL.h)}>
      <div className="scene-owl-bob">
        <span className="scene-sprite scene-owl-wing-l" style={sprite} />
        <span className="scene-sprite scene-owl-wing-r" style={sprite} />
        <span className="scene-sprite scene-owl-body" style={sprite} />
      </div>
    </div>
  );
}

function Steam() {
  return (
    <>
      {[0, -1.5, -3].map((delay) => (
        <span
          key={delay}
          className="scene-sprite scene-steam"
          style={{
            ...rect(STEAM.x, STEAM.y, STEAM.w, STEAM.h),
            backgroundImage: "url(/images/steam.png)",
            animationDelay: `${delay}s`,
          }}
        />
      ))}
    </>
  );
}

function Lantern({
  cx,
  cy,
  gw,
  gh,
  delay,
}: (typeof LANTERNS)[number]) {
  return (
    <>
      <span
        className="scene-lantern-glow"
        style={{ ...rect(cx - 75, cy - 75, 150, 150), animationDelay: delay }}
      />
      <span
        className="scene-lantern-core"
        style={{ ...rect(cx - gw / 2, cy - gh / 2, gw, gh), animationDelay: delay }}
      />
    </>
  );
}

export default function PixelScene({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      {/* night is the default; the light theme swaps to the day grade via CSS */}
      <Image
        src="/images/hero-scene.jpg"
        alt="Pixel art of a girl coding on a castle wall at night, with a cat, a mug, an owl delivering a letter and a lit castle across the lake"
        fill
        priority
        sizes="100vw"
        className="scene-night pixelated object-cover"
      />
      <Image
        src="/images/hero-scene-day.jpg"
        alt="Pixel art of a girl coding on a castle wall by day, with a cat, a mug, an owl delivering a letter and a castle across the lake"
        fill
        sizes="100vw"
        className="scene-day pixelated object-cover"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {LANTERNS.map((l) => (
          <Lantern key={l.cx} {...l} />
        ))}
        <Laptop />
        <Steam />
        <Owl />
      </div>
    </div>
  );
}

import Image from "next/image";

// A small Iron Man, hovering: bobbing gently, warm glow, embers dropping from his thrusters.
// `className` sets the size (the sprite is 40x44 px, scaled with pixelated rendering).
export default function IronMan({ className = "w-10" }: { className?: string }) {
  return (
    <span aria-hidden className={`relative inline-block ${className}`}>
      <span className="hover-ironman block">
        <Image src="/images/ironman-front.png" alt="" width={40} height={44} unoptimized className="pixelated w-full" />
      </span>
      {[
        ["38%", "0s"],
        ["56%", "0.7s"],
        ["46%", "1.4s"],
      ].map(([left, delay]) => (
        <span key={delay} className="ember absolute top-[90%] size-[3px] bg-[#f09a3c]" style={{ left, animationDelay: delay }} />
      ))}
    </span>
  );
}

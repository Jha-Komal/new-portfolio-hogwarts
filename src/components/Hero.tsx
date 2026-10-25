import Link from "next/link";
import navigation from "@/data/navigation.json";
import profile from "@/data/profile.json";
import MusicPlayer from "./MusicPlayer";
import QuoteRotator from "./QuoteRotator";
import PixelScene from "./PixelScene";

export default function Hero() {
  return (
    <section className="relative flex min-h-[36rem] shrink-0 overflow-hidden lg:min-h-[calc(100dvh-90px)] rounded-lg border border-line bg-panel text-foreground">
      {/* size container so the 16:9 scene can be sized from the panel (cqw/cqh).
          mobile: cover the panel. desktop: at least 72% of the width, anchored right/bottom. */}
      <div className="absolute inset-0 overflow-hidden [container-type:size]">
        <PixelScene
          className="absolute h-[max(100cqh,56.25cqw)] w-[max(177.78cqh,100cqw)] top-0 left-[calc((100cqw-max(177.78cqh,100cqw))*0.4)]
            lg:left-auto lg:right-0 lg:h-[max(100cqh,40.5cqw)] lg:w-[max(177.78cqh,72cqw)] lg:top-[calc((100cqh-max(100cqh,40.5cqw))*0.75)]"
        />
      </div>
      <MusicPlayer />
      {/* fade the art into the panel behind the text */}
      <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/70 to-panel/40 lg:bg-gradient-to-r lg:from-panel lg:from-[27%] lg:via-panel/75 lg:via-[40%] lg:to-transparent lg:to-[54%]" />

      <div className="relative flex w-full flex-col justify-between gap-5 p-6 sm:p-10 lg:gap-4 lg:px-12 lg:py-6">
        <div className="hero-copy max-w-2xl">
          <p className="mb-4 text-base lg:text-lg">{profile.greeting}</p>
          <h1 className="font-display text-4xl font-bold leading-[1.1] sm:text-5xl xl:text-6xl">
            {profile.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="block text-amber">{profile.headlineAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/90 lg:text-lg">
            {profile.intro}
          </p>
        </div>

        <ul className="w-full max-w-xs space-y-1 text-base lg:text-lg">
          {navigation.heroMenu.map((m, i) => (
            <li key={m.href}>
              <Link
                href={m.href}
                className={`group flex items-center justify-between gap-6 rounded-md border px-4 py-1.5 transition-colors ${
                  i === 0
                    ? "border-green bg-green/5 text-foreground"
                    : "border-transparent text-foreground/80 hover:border-green/60"
                }`}
              >
                <span>
                  <span className="mr-4 text-foreground/70">{m.n}.</span>
                  {m.label}
                </span>
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <QuoteRotator quotes={profile.quotes} author={profile.name} />
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useActiveSection } from "@/lib/spy";

const VOLUME = 0.12; // deliberately quiet background level
const FADE_MS = 2500;

// Hedwig's Theme, quietly looping on the home page. Browsers block sound until the visitor
// interacts, so it tries to autoplay and otherwise starts on the first click / tap / key.
// It is on by default on every visit; a mute only lasts for the current browser session.
export default function MusicPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const fade = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const [playing, setPlaying] = useState(false);
  // the site is one page: music plays only while the home (hero) section is on screen
  const onHome = useActiveSection() === "home";
  const [muted, setMuted] = useState(false); // true only if the visitor muted it this session

  useEffect(() => {
    const el = audio.current;
    if (!el || !onHome) return;

    let muted = false;
    try {
      muted = sessionStorage.getItem("music") === "off";
    } catch {}
    if (muted) {
      setMuted(true);
      return;
    }

    const events = ["pointerdown", "keydown", "touchstart"] as const;
    const cleanup = () => events.forEach((e) => window.removeEventListener(e, start));
    function start() {
      if (!el) return;
      el.volume = 0;
      el.play().then(
        () => {
          // ease the volume in (a timer, so it also runs in a background tab)
          const t0 = Date.now();
          clearInterval(fade.current);
          fade.current = setInterval(() => {
            const k = Math.min(1, (Date.now() - t0) / FADE_MS);
            el.volume = VOLUME * k;
            if (k === 1) clearInterval(fade.current);
          }, 100);
          cleanup();
        },
        () => {
          /* blocked: wait for a gesture */
        },
      );
    }
    events.forEach((e) => window.addEventListener(e, start, { once: true }));
    start();

    return () => {
      cleanup();
      clearInterval(fade.current);
      el.pause();
    };
  }, [onHome]);

  const toggle = () => {
    const el = audio.current;
    if (!el) return;
    if (el.paused) {
      el.volume = VOLUME;
      void el.play();
      setMuted(false);
      try {
        sessionStorage.setItem("music", "on");
      } catch {}
    } else {
      el.pause();
      setMuted(true);
      try {
        sessionStorage.setItem("music", "off");
      } catch {}
    }
  };

  return (
    <>
      <audio
        ref={audio}
        src="/audio/hedwigs-theme.mp3"
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Mute music" : "Play music"}
        title={playing ? "Mute music" : "Play music"}
        className="absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-md border border-line bg-panel/80 px-3 py-1.5 text-xs text-foreground/80 backdrop-blur-sm transition-colors hover:border-green/60 hover:text-green"
      >
        <span aria-hidden className={!playing && !muted ? "animate-pulse" : ""}>
          ♪
        </span>
        {playing ? "music on" : muted ? "music off" : "click anywhere to start music"}
      </button>
    </>
  );
}

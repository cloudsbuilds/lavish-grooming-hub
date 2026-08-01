import { useEffect, useState } from "react";
import logo from "@/assets/tiger-logo.png";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 2500;
    let frame = 0;

    const tick = (now: number) => {
      const pct = Math.min(100, ((now - start) / duration) * 100);
      setProgress(pct);
      if (pct < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setFading(true);
        window.setTimeout(() => setDone(true), 800);
      }
    };
    frame = requestAnimationFrame(tick);

    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  if (done) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background transition-opacity duration-[800ms] ease-out"
      style={{ opacity: fading ? 0 : 1, pointerEvents: fading ? "none" : "auto" }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_50%_45%,var(--gold-deep),transparent_60%)]" />
      <img
        src={logo}
        alt=""
        width={816}
        height={816}
        className="animate-gold-pulse relative w-32 sm:w-40 md:w-48"
      />
      <p className="font-display relative mt-8 text-xs tracking-[0.5em] text-gold uppercase sm:text-sm">
        Lavish Men&apos;s Saloon
      </p>
      <div className="relative mt-6 h-[3px] w-52 overflow-hidden rounded-full bg-muted sm:w-72">
        <div
          className="bg-gold-gradient h-full rounded-full transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="relative mt-3 text-[0.7rem] tracking-[0.3em] text-muted-foreground">
        {Math.round(progress)}%
      </p>
    </div>
  );
}

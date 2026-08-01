import { ArrowRight, Scissors, Sparkles, Star } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { Reveal } from "./Reveal";

export function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      <img
        src={heroImage}
        alt="Interior of a luxury barbershop with a gold-trimmed leather chair"
        width={1920}
        height={1280}
        className="animate-slow-zoom absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-veil)" }}
      />

      <div className="section-x relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center pt-28 pb-16 sm:pt-32">
        <Reveal className="glass w-fit rounded-full px-4 py-1.5">
          <span className="flex items-center gap-2 text-[0.65rem] tracking-[0.24em] text-gold uppercase sm:text-xs">
            <Star className="h-3.5 w-3.5" /> Est. 2012 · Master Barbers & Skin Therapists
          </span>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] font-semibold sm:text-6xl lg:text-7xl xl:text-8xl">
            Refine Your Look.
            <span className="text-gold-gradient block">Rejuvenate Your Skin.</span>
          </h1>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            A private grooming house for the modern gentleman — precision cuts, straight-razor
            rituals and gold-infused skin therapy, delivered in quiet luxury.
          </p>
        </Reveal>

        <Reveal delay={320} className="mt-9 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onBook}
            className="bg-gold-gradient tap flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold sm:px-8 sm:text-base"
          >
            Book Appointment <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href="#services"
            className="glass tap flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-foreground hover:border-gold/50 hover:text-gold sm:px-8 sm:text-base"
          >
            Explore Services <Scissors className="h-4 w-4" />
          </a>
        </Reveal>

        <Reveal delay={420} className="mt-14 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { value: "14 yrs", label: "Of craft" },
            { value: "9", label: "Master barbers" },
            { value: "22k+", label: "Cuts delivered" },
            { value: "4.9★", label: "Guest rating" },
          ].map((stat) => (
            <div key={stat.label} className="glass lift tap rounded-2xl px-4 py-4">
              <p className="font-display text-xl font-semibold text-gold sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[0.7rem] tracking-[0.14em] text-muted-foreground uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal
          delay={520}
          className="mt-10 flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground uppercase"
        >
          <Sparkles className="h-4 w-4 text-gold" /> Walk-ins welcome · Open daily 9am – 9pm
        </Reveal>
      </div>
    </section>
  );
}

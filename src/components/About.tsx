import { Award, Crown, Leaf, Timer } from "lucide-react";
import aboutImage from "@/assets/about.jpg";
import toolsImage from "@/assets/tools.jpg";
import { Reveal } from "./Reveal";

const PILLARS = [
  {
    icon: Crown,
    title: "Master craftsmanship",
    body: "Every barber holds 8+ years of tenure and trains quarterly in classic and modern technique.",
  },
  {
    icon: Leaf,
    title: "Clinical-grade skincare",
    body: "Facials formulated with our in-house apothecary — no fragrance, no filler, visible results.",
  },
  {
    icon: Timer,
    title: "Never rushed",
    body: "One guest per chair per slot. Your appointment starts on time and ends when it's perfect.",
  },
  {
    icon: Award,
    title: "Members' privileges",
    body: "Priority booking, complimentary line-ups between visits and a private product locker.",
  },
];

export function About() {
  return (
    <section id="about" className="section-x scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="grid grid-cols-5 gap-4">
          <Reveal className="col-span-3">
            <img
              src={aboutImage}
              alt="Guest with a freshly sculpted fade and beard"
              loading="lazy"
              width={1200}
              height={1500}
              className="shadow-lux h-full w-full rounded-3xl object-cover"
            />
          </Reveal>
          <Reveal delay={140} className="col-span-2 flex flex-col gap-4">
            <img
              src={toolsImage}
              alt="Gold barber scissors and straight razor on black slate"
              loading="lazy"
              width={1200}
              height={1200}
              className="shadow-lux w-full rounded-3xl object-cover"
            />
            <div className="glass flex flex-1 flex-col justify-center rounded-3xl p-5">
              <p className="font-display text-3xl font-semibold text-gold">14</p>
              <p className="mt-1 text-xs tracking-[0.18em] text-muted-foreground uppercase">
                Years shaping the city&apos;s sharpest looks
              </p>
            </div>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <p className="text-[0.7rem] tracking-[0.32em] text-gold uppercase">The House</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">
              Grooming treated as a <span className="text-gold-gradient">discipline</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Lavish Men&apos;s Saloon was built on a simple belief: a great cut is engineering, and
              great skin is chemistry. Our chairs sit in a low-lit room of blackened oak and brass,
              where each ritual is measured, deliberate and entirely yours.
            </p>
          </Reveal>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {PILLARS.map((pillar, index) => (
              <Reveal
                as="li"
                key={pillar.title}
                delay={index * 80}
                className="glass lift tap rounded-2xl p-5"
              >
                <pillar.icon className="h-5 w-5 text-gold" />
                <h3 className="mt-3 text-base font-semibold">{pillar.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {pillar.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

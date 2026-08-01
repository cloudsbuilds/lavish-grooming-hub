import { useMemo, useState } from "react";
import { Clock, Flame } from "lucide-react";
import { CATEGORIES, useSalon } from "@/lib/salon-store";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function Services({ onBook }: { onBook: (serviceId: string) => void }) {
  const { services } = useSalon();
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");

  const visible = useMemo(
    () => (active === "All" ? services : services.filter((s) => s.category === active)),
    [services, active],
  );

  return (
    <section id="services" className="section-x relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-[0.7rem] tracking-[0.32em] text-gold uppercase">Services & Pricing</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold sm:text-5xl">
            A curated menu of <span className="text-gold-gradient">grooming rituals</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            Every service includes consultation, hot towel service and a complimentary beverage from
            our bar.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-9 flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={cn(
                "tap rounded-full px-4 py-2 text-xs font-semibold tracking-[0.12em] uppercase sm:text-sm",
                active === category
                  ? "bg-gold-gradient text-primary-foreground shadow-gold"
                  : "glass text-muted-foreground hover:border-gold/40 hover:text-gold",
              )}
            >
              {category}
            </button>
          ))}
        </Reveal>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((service, index) => (
            <Reveal
              as="li"
              key={service.id}
              delay={index * 60}
              className="glass lift tap group flex flex-col rounded-3xl p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="rounded-full border border-gold/30 px-3 py-1 text-[0.62rem] tracking-[0.18em] text-gold uppercase">
                  {service.category}
                </span>
                <span className="font-display text-2xl font-semibold text-gold-soft">
                  ${service.price}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold sm:text-xl">{service.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {service.duration}
                </span>
                <button
                  type="button"
                  onClick={() => onBook(service.id)}
                  className="tap flex items-center gap-1.5 rounded-full border border-gold/40 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-gold uppercase [@media(hover:hover)]:hover:bg-gold-gradient [@media(hover:hover)]:hover:text-primary-foreground"
                >
                  <Flame className="h-3.5 w-3.5" /> Book
                </button>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

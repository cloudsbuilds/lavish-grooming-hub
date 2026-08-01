import { CalendarClock, MapPin, Phone } from "lucide-react";
import { Reveal } from "./Reveal";

export function BookingSection({ onBook }: { onBook: () => void }) {
  return (
    <section id="booking" className="section-x scroll-mt-24 pb-20 sm:pb-28">
      <Reveal className="glass-strong mx-auto max-w-7xl overflow-hidden rounded-4xl p-6 sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="text-[0.7rem] tracking-[0.32em] text-gold uppercase">Booking</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">
              Reserve your chair at <span className="text-gold-gradient">Lavish</span>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              Choose a service, pick a slot and we&apos;ll have everything prepared — hot towels,
              your preferred barber, and a drink of choice waiting.
            </p>
            <button
              type="button"
              onClick={onBook}
              className="bg-gold-gradient tap mt-8 flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold sm:text-base"
            >
              <CalendarClock className="h-4 w-4" /> Open booking form
            </button>
          </div>

          <ul className="grid gap-4">
            {[
              {
                icon: MapPin,
                title: "The Atelier",
                body: "184 Aurum Street, Downtown District",
              },
              { icon: Phone, title: "Front desk", body: "+1 (415) 220-0184" },
              {
                icon: CalendarClock,
                title: "Opening hours",
                body: "Mon–Sat 9:00–21:00 · Sun 10:00–18:00",
              },
            ].map((item) => (
              <li key={item.title} className="glass lift tap flex gap-4 rounded-2xl p-5">
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

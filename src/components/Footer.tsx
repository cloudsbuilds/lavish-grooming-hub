import { Instagram, Facebook, Twitter } from "lucide-react";
import logo from "@/assets/tiger-logo.png";

export function Footer({ onAdmin }: { onAdmin: () => void }) {
  return (
    <footer className="section-x border-t border-border bg-surface/60 py-12">
      <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Lavish Men's Saloon emblem"
              loading="lazy"
              width={816}
              height={816}
              className="h-11 w-11"
            />
            <span className="font-display text-[0.7rem] leading-tight tracking-[0.24em] uppercase">
              Lavish
              <br />
              Men&apos;s Saloon
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Precision grooming and skin therapy for the modern gentleman.
          </p>
        </div>

        <div>
          <p className="text-[0.7rem] tracking-[0.24em] text-gold uppercase">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#services" className="tap hover:text-gold">
                Services & Pricing
              </a>
            </li>
            <li>
              <a href="#about" className="tap hover:text-gold">
                About the house
              </a>
            </li>
            <li>
              <a href="#booking" className="tap hover:text-gold">
                Booking
              </a>
            </li>
            <li>
              <button type="button" onClick={onAdmin} className="tap hover:text-gold">
                Admin portal
              </button>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[0.7rem] tracking-[0.24em] text-gold uppercase">Visit</p>
          <p className="mt-4 text-sm text-muted-foreground">
            184 Aurum Street
            <br />
            Downtown District
            <br />
            +1 (415) 220-0184
          </p>
        </div>

        <div>
          <p className="text-[0.7rem] tracking-[0.24em] text-gold uppercase">Follow</p>
          <div className="mt-4 flex gap-2">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#top"
                aria-label="Social profile"
                className="glass tap flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:border-gold/50 hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-7xl border-t border-border pt-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Lavish Men&apos;s Saloon. All rights reserved.
      </p>
    </footer>
  );
}

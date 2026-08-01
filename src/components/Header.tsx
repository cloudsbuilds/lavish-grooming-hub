import { useEffect, useState } from "react";
import { Menu, ShieldCheck, X } from "lucide-react";
import logo from "@/assets/tiger-logo.png";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Booking", href: "#booking" },
];

export function Header({
  onBook,
  onAdmin,
}: {
  onBook: () => void;
  onAdmin: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="section-x fixed inset-x-0 top-0 z-50 pt-3 sm:pt-5">
      <nav
        className={cn(
          "glass mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl px-3 py-2.5 transition-all duration-500 sm:px-5 sm:py-3",
          scrolled && "shadow-lux border-gold/20",
        )}
      >
        <a href="#top" className="tap flex items-center gap-2.5 sm:gap-3">
          <img
            src={logo}
            alt="Lavish Men's Saloon tiger emblem"
            width={816}
            height={816}
            className="h-9 w-9 shrink-0 sm:h-11 sm:w-11"
          />
          <span className="font-display leading-tight">
            <span className="block text-[0.62rem] tracking-[0.34em] text-gold uppercase sm:text-[0.7rem]">
              Lavish
            </span>
            <span className="block text-[0.62rem] tracking-[0.2em] text-foreground/80 uppercase sm:text-[0.7rem]">
              Men&apos;s Saloon
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="tap rounded-full px-4 py-2 text-sm font-medium text-foreground/75 hover:text-gold [@media(hover:hover)]:hover:bg-accent/40"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onAdmin}
            className="tap flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-foreground/75 hover:text-gold"
          >
            <ShieldCheck className="h-4 w-4" /> Admin
          </button>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={onBook}
            className="bg-gold-gradient tap hidden rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-gold sm:block"
          >
            Book Now
          </button>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="glass tap flex h-9 w-9 items-center justify-center rounded-full lg:hidden"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="glass-strong mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl p-2 lg:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="tap block rounded-xl px-4 py-3 text-sm font-medium text-foreground/80 hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onAdmin();
            }}
            className="tap block w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-foreground/80 hover:text-gold"
          >
            Admin Portal
          </button>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onBook();
            }}
            className="bg-gold-gradient tap mt-1 w-full rounded-xl px-4 py-3 text-sm font-semibold text-primary-foreground"
          >
            Book Appointment
          </button>
        </div>
      ) : null}
    </header>
  );
}

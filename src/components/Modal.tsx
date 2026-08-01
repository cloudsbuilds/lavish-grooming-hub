import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-90 flex items-start justify-center overflow-y-auto p-3 sm:items-center sm:p-6">
      <button
        aria-label="Close overlay"
        onClick={onClose}
        className="fixed inset-0 cursor-default bg-background/70 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "glass-strong animate-in fade-in zoom-in-95 relative my-auto w-full max-w-lg rounded-3xl p-5 duration-500 sm:p-8",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-semibold sm:text-2xl">{title}</h2>
            {subtitle ? (
              <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="glass tap flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:text-gold"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

export const fieldClass =
  "w-full rounded-xl border border-input bg-surface/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-gold/25";

export const labelClass =
  "mb-2 block text-[0.7rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase";

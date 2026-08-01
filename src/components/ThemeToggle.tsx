import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="glass tap relative flex h-9 w-16 items-center rounded-full px-1 hover:border-gold/50"
    >
      <span
        className="bg-gold-gradient flex h-7 w-7 items-center justify-center rounded-full text-primary-foreground shadow-gold transition-transform duration-500 ease-out"
        style={{ transform: theme === "dark" ? "translateX(0)" : "translateX(28px)" }}
      >
        {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </span>
    </button>
  );
}

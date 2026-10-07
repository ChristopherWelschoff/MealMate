import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <span className="text-sm text-foreground">Dark mode</span>

      <button
        type="button"
        role="switch"
        aria-label="Dark mode"
        aria-checked={resolvedTheme === "dark"}
        onClick={toggleTheme}
        suppressHydrationWarning
        className="relative h-7 w-12 shrink-0 rounded-full bg-input transition dark:bg-primary"
      >
        <span className="absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-card shadow-sm transition-transform dark:translate-x-5">
          <Sun
            size={12}
            className="text-amber-500 dark:hidden"
            aria-hidden="true"
          />
          <Moon
            size={12}
            className="hidden text-primary dark:block"
            aria-hidden="true"
          />
        </span>
      </button>
    </div>
  );
}

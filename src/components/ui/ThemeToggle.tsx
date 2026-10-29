"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const timer = setTimeout(() => {
      const saved = localStorage.getItem("growhaus_theme") as "dark" | "light" | null;
      if (saved === "light") {
        setTheme("light");
        document.documentElement.classList.add("theme-light");
      } else {
        setTheme("dark");
        document.documentElement.classList.remove("theme-light");
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = theme === "dark" ? "light" : "dark";

    const updateDOM = () => {
      setTheme(newTheme);
      localStorage.setItem("growhaus_theme", newTheme);
      if (newTheme === "light") {
        document.documentElement.classList.add("theme-light");
      } else {
        document.documentElement.classList.remove("theme-light");
      }
    };

    // Circular View Transition if supported
    const docWithTransition = document as unknown as {
      startViewTransition?: (callback: () => void) => { ready?: Promise<void> };
    };

    if (
      typeof document !== "undefined" &&
      docWithTransition.startViewTransition &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const x = e.clientX;
      const y = e.clientY;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = docWithTransition.startViewTransition(() => {
        updateDOM();
      });

      transition?.ready?.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 400,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    } else {
      updateDOM();
    }
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="relative w-9 h-9 rounded-xl border border-white/10 bg-[#111115] flex items-center justify-center text-zinc-300 hover:text-white hover:border-white/20 transition-all cursor-pointer"
    >
      <Sun className={`w-4 h-4 transition-transform ${theme === "light" ? "scale-100 rotate-0 text-amber-500" : "scale-0 -rotate-90 hidden"}`} />
      <Moon className={`w-4 h-4 transition-transform ${theme === "dark" ? "scale-100 rotate-0 text-zinc-300" : "scale-0 rotate-90 hidden"}`} />
    </button>
  );
}

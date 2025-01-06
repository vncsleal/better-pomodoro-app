"use client";

import { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const storedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = storedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  if (!theme) return null; // Don't render button until theme is initialized

  return (
    <button
      onClick={toggleTheme}
      className="
        z-50
        w-10 h-10
        bg-white dark:bg-zinc-800
        rounded-full
        flex items-center justify-center
        transition-all duration-300
        hover:bg-zinc-100 dark:hover:bg-zinc-700
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        dark:focus:ring-blue-400
        
      "
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-yellow-400"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 text-zinc-900"
        >
          <path d="M20.354 15.854A9 9 0 0 1 8.146 3.646 9.003 9.003 0 0 0 12 21a9.003 9.003 0 0 0 8.354-5.146z" />
        </svg>
      )}
    </button>
  );
}
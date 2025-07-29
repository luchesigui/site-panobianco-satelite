"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Don't render anything on server-side or before hydration
  if (!mounted) {
    return (
      <div className="p-2 rounded-md w-9 h-9">
        {/* Placeholder to maintain layout during SSR */}
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md transition-colors hover:bg-light-border dark:hover:bg-dark-border"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-dark-text-primary" />
      ) : (
        <Moon className="h-5 w-5 text-light-text-primary" />
      )}
    </button>
  );
}
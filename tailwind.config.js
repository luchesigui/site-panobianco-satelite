/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#f15927", // Vibrant Orange for buttons, highlights, icons
        },
        // Light theme colors (default)
        light: {
          bg: {
            primary: "#ffffff",     // White background
            secondary: "#f8fafc",   // Light gray background for sections
            card: "#ffffff",        // White for cards
          },
          text: {
            primary: "#1e293b",     // Dark gray for primary text - excellent contrast
            secondary: "#64748b",   // Medium gray for secondary text
            muted: "#94a3b8",       // Light gray for muted text
          },
          border: "#e2e8f0",        // Light gray borders
        },
        // Dark theme colors
        dark: {
          bg: {
            primary: "#121212",     // Dark background
            secondary: "#1f1f1f",   // Slightly lighter dark for sections
            card: "#2a2a2a",        // Dark gray for cards
          },
          text: {
            primary: "#ffffff",     // White for primary text
            secondary: "#d1d5db",   // Light gray for secondary text
            muted: "#9ca3af",       // Medium gray for muted text
          },
          border: "#333333",        // Dark gray borders
        },
        state: {
          disabled: {
            background: "#f1f5f9",
            text: "#94a3b8",
            "dark-background": "#3f3f46",
            "dark-text": "#71717a",
          },
          focus: {
            ring: "#f15927", // Vibrant Orange for focus states
          },
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
      },
      spacing: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
      },
      maxWidth: {
        // Container widths based on the schema provided
        'container-xs': '100%',      // Extra small: 100%
        'container-sm': '540px',     // Small: 540px
        'container-md': '720px',     // Medium: 720px
        'container-lg': '960px',     // Large: 960px
        'container-xl': '1140px',    // X-Large: 1140px
        'container-xxl': '1320px',   // XX-Large: 1320px
        'container-fluid': '100%',   // Fluid: 100%
      },
      borderRadius: {
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        full: "9999px",
      },
      screens: {
        'xs': '0px',      // Extra small
        'sm': '576px',    // Small
        'md': '768px',    // Medium
        'lg': '992px',    // Large
        'xl': '1200px',   // X-Large
        'xxl': '1400px',  // XX-Large
      },
    },
  },
  plugins: [],
};

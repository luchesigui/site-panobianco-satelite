/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#f15927", // Vibrant Orange for buttons, highlights, icons
        },
        neutral: {
          background: "#121212",
          surface: "#1f1f1f",
          border: "#333333",
          "text-primary": "#2A2F31", // Dark Charcoal for primary text
          "text-secondary": "#a3a3a3",
        },
        state: {
          disabled: {
            background: "#3f3f46",
            text: "#71717a",
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

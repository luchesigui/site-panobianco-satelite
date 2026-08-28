/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				primary: {
					500: "#FF6100", // Panobianco 2026 orange
				},
				"background-light": "#FAEDE4",
				"background-dark": "#161515",
				// Panobianco 2026 surfaces. Keep the existing utility names so pages
				// can adopt the new system without structural changes.
				light: {
					bg: {
						primary: "#FAEDE4",
						secondary: "#ffffff",
						card: "#ffffff",
					},
					text: {
						primary: "#3D3336",
						secondary: "#87756B",
						muted: "#87756B",
					},
					border: "#87756B",
				},
				// Dark surfaces from the Panobianco 2026 palette.
				dark: {
					bg: {
						primary: "#161515",
						secondary: "#330000",
						card: "#3D3336",
					},
					text: {
						primary: "#ffffff", // Original white for primary text
						secondary: "#d1d5db", // Original light gray for secondary text
						muted: "#d1d5db", // Keep secondary color for muted (original didn't have separate muted)
					},
					border: "#3D3336",
				},
				state: {
					disabled: {
						background: "#f1f5f9",
						text: "#94a3b8",
						"dark-background": "#3f3f46",
						"dark-text": "#71717a",
					},
					focus: {
						ring: "#FF6100", // Panobianco 2026 orange for focus states
					},
				},
			},
			fontFamily: {
				display: [
					"Forma DJR Micro",
					"var(--font-archivo)",
					"Archivo",
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
				],
				sans: [
					"var(--font-archivo)",
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
				bebas: ["var(--font-bebas-neue)", "sans-serif"],
				montserrat: ["var(--font-montserrat)", "sans-serif"],
				roboto: ["var(--font-roboto)", "sans-serif"],
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
				"container-xs": "100%", // Extra small: 100%
				"container-sm": "540px", // Small: 540px
				"container-md": "720px", // Medium: 720px
				"container-lg": "960px", // Large: 960px
				"container-xl": "1140px", // X-Large: 1140px
				"container-xxl": "1320px", // XX-Large: 1320px
				"container-fluid": "100%", // Fluid: 100%
			},
			borderRadius: {
				DEFAULT: "1rem",
				sm: "0.25rem",
				md: "0.5rem",
				lg: "2rem",
				xl: "3rem",
				full: "9999px",
			},
			screens: {
				xs: "0px", // Extra small
				sm: "576px", // Small
				md: "768px", // Medium
				lg: "992px", // Large
				xl: "1200px", // X-Large
				xxl: "1400px", // XX-Large
			},
		},
	},
	plugins: [],
};

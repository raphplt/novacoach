/** @type {import('tailwindcss').Config} */
const { nextui, colors } = require("@nextui-org/react");
const { error } = require("console");
module.exports = {
	content: [
		"../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#134074",
				secondary: "#13315C",
				tertiary: "#8DA9C4",
				dark: "#0B2545",
				light: "#EEF4ED",
				error: "#F84825",
			},
		},
	},
	darkMode: "class",
	plugins: [
		nextui({
			defaultTheme: "light",
			themes: {
				light: {
					colors: {
						primary: "#134074",
						secondary: "#13315C",

						warning: "#FF8A00",
					},
				},
				dark: {
					colors: {
						primary: "#134074",
						secondary: "#13315C",
					},
				},
			},
		}),
	],
};

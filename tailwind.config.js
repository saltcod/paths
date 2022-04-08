module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	variants: {
		extend: {},
	},
	plugins: [],
	theme: {
		extend: {
			fontSize: {
				"8xl": "8rem",
				"9xl": "9rem",
				"10xl": "10rem",
			},
		},
	},
};

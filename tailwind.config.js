module.exports = {
	purge: [ './src/**/*.{js,jsx,ts,tsx}', './public/index.html' ],
	theme: {
		extend: {}
	},
	plugins: [ require('@tailwindcss/forms') ]
};

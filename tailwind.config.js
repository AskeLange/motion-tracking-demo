// prettier-ignore
const { makeThemeUtilities } = require('./components/global/ThemeConfiguration/helpers.js');
const generateBreakpoints = require('./assets/js/breakpoints.js');

const { layout, fontSize, spacing } = makeThemeUtilities();
const { screens } = generateBreakpoints([768, 1024, 1440]);

module.exports = {
	content: [
		'./components/**/*.{vue,js}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}',
	],

	theme: {
		screens,

		/**
		 * Colors
		 */
		colors: {
			white: 'rgb(var(--color-white) / var(--tw-bg-opacity, 1))',
			black: 'rgb(var(--color-black) / var(--tw-bg-opacity, 1))',

			primary: 'rgb(var(--color-primary) / var(--tw-bg-opacity, 1))',
			secondary: 'rgb(var(--color-secondary) / var(--tw-bg-opacity, 1))',
			tertiary: 'rgb(var(--color-tertiary) / var(--tw-bg-opacity, 1))',

			transparent: 'transparent',
			current: 'currentColor',
		},

		/**
		 * Fonts
		 */
		fontSize: fontSize,

		fontFamily: {
			'helvetica-neue': ['Helvetica Neue', 'helvetica', 'sans-serif'],
		},

		fontWeight: {
			normal: 400,
		},

		lineHeight: {
			1: '1',
		},

		/**
		 * Transitions
		 */
		transitionTimingFunction: {
			in: 'cubic-bezier(0.7, 0, .6, .9)',
			out: 'cubic-bezier(0.4, 0.1, 0.3, 1)',
			'in-out': 'cubic-bezier(0.7, 0, 0.3, 1)',
		},

		transitionDuration: {
			100: '100ms',
			200: '200ms',
			300: '300ms',
			500: '500ms',
			1000: '1000ms',
		},

		/**
		 * Spacing
		 */
		spacing: {
			'layout-margin': layout.margin,
			'layout-gutter': layout.gutter,
			'layout-max': layout.max,

			...layout.columns,
			...spacing,

			0: '0px',
			10: '10px',
			auto: 'auto',
			full: '100%',
		},

		margin: {
			'layout-margin': layout.margin,
			'layout-gutter': layout.gutter,
			'layout-max': layout.max,

			...layout.columns,
			...spacing,

			0: '0px',
			'1/2': '50%',
			auto: 'auto',
		},

		padding: {
			'layout-margin': layout.margin,
			'layout-gutter': layout.gutter,
			'layout-max': layout.max,

			...layout.columns,
			...spacing,

			0: '0px',
		},

		gap: {
			'layout-margin': layout.margin,
			'layout-gutter': layout.gutter,
			'layout-max': layout.max,

			...layout.columns,
			...spacing,

			0: '0px',
		},

		width: {
			'layout-max': layout.max,
			...layout.columns,
			...spacing,

			0: '0px',
			auto: 'auto',
			full: '100%',
			screen: '100vw',
			fit: 'fit-content',
			max: 'max-content',
			min: 'min-content',
		},

		minWidth: {
			'layout-max': layout.max,
			...layout.columns,
			...spacing,

			0: '0px',
			auto: 'auto',
			full: '100%',
			screen: '100vw',
			fit: 'fit-content',
			max: 'max-content',
			min: 'min-content',
		},

		maxWidth: {
			'layout-max': layout.max,
			...layout.columns,
			...spacing,

			0: '0px',
			auto: 'auto',
			full: '100%',
			screen: '100vw',
			fit: 'fit-content',
			max: 'max-content',
			min: 'min-content',
		},

		height: {
			...spacing,

			0: '0px',
			auto: 'auto',
			full: '100%',
			screen: '100vh',
			fit: 'fit-content',
			max: 'max-content',
			min: 'min-content',
		},

		minHeight: {
			...spacing,

			0: '0px',
			auto: 'auto',
			full: '100%',
			screen: '100vh',
			fit: 'fit-content',
			max: 'max-content',
			min: 'min-content',
		},

		maxHeight: {
			...spacing,

			0: '0px',
			auto: 'auto',
			full: '100%',
			screen: '100vh',
			fit: 'fit-content',
			max: 'max-content',
			min: 'min-content',
		},
	},
};

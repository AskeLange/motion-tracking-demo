/*
	The default config should typically be set as the values of
	the main solution. These can then be overwritten by the values
	coming from backend (handled in the ThemeConfiguration.vue component).

	You should never remove keys from this object, as Limbo Citi Baseline
	styles might be relying on them, but new keys may be added if needed.
*/
module.exports = {
	// Testing only - set to false when done testing
	minify: false, // Can be turned to false for a more readable output in the style tag

	// Setup
	baseFontSize: 16, // For rem conversion
	smViewport: 375, // Lowest value clamp
	mdViewport: 1440, // Midpoint (used for both low-clamp and high-clamp)
	lgViewport: 1920, // Highest value clamp

	// Configuration
	layout: {
		margin: {
			sm: 20,
			md: 72,
			lg: 72,
		},

		gutter: {
			sm: 16,
			md: 24,
			lg: 24,
		},

		// These rules will be turned into `X/Ycol` rules, which can then be used like `w-3/12col`.
		// There should always be at least one column, both on sm, md and lg.
		columns: {
			sm: 4,
			md: 12,
			lg: 12,
		},

		// The max value that the design can be scaled to (single value, not sm-md-lg).
		// The max will impact columns max scaling as well.
		// undefined equals no max.
		max: 1920,
	},

	spacing: {
		md: {
			sm: 32,
			md: 40,
			lg: 40,
		},
	},

	fontSize: {
		body: {
			fontSize: {
				sm: 18,
				md: 24,
				lg: 24,
			},
			lineHeight: {
				sm: 1.5,
				md: 1.5,
				lg: 1.5,
			},
			letterSpacing: {
				sm: 0,
				md: 0,
				lg: 0,
			},
		},
	},
};

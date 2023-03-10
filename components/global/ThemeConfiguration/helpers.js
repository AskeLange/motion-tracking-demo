const cloneDeep = require('clone-deep');

const defaultConfig = require('./../../../assets/js/theme-configuration.js');

module.exports = {
	makeThemeUtilities,
	restructureFontSizeObject,
};

// Down here we have some practical functions (shouldn't be altered)
// Function to generate the tailwind utility values.
function makeThemeUtilities() {
	const config = cloneDeep(defaultConfig);
	if (config.fontSize) {
		const fontSizeUtils = restructureFontSizeObject(config.fontSize);
		delete config.fontSize;
		Object.assign(config, fontSizeUtils);
	}

	const obj = {};
	Object.keys(config).forEach((key) => {
		if (typeof config[key] === 'object') {
			Object.keys(config[key]).forEach((subKey) => {
				// Special case setup for columns
				if (key === 'layout' && subKey === 'columns') {
					const columns = obj[key]?.[subKey] || {};
					const { sm, md, lg } = config[key][subKey];
					const colCounts = [...new Set([sm, md, lg])];

					for (let i = 0; i < colCounts.length; i++) {
						for (let j = 1; j <= colCounts[i]; j++) {
							columns[
								`${j}/${colCounts[i]}col`
							] = `calc(var(--theme-${key}-column-of-${
								colCounts[i]
							}) * ${j} + var(--theme-layout-gutter, var(--theme-layout-gutter--sm)) * ${
								j - 1
							})`;
						}
					}

					obj[key][subKey] = columns;
					return;
				}

				// Special case for layout max
				if (key === 'layout' && subKey === 'max') {
					const fallbackValue =
						typeof config[key][subKey] === 'undefined'
							? '100vw'
							: `${config[key][subKey]}px`;
					obj[key] = obj[key] || {};
					obj[key][
						subKey
					] = `var(--theme-${key}-${subKey}, ${fallbackValue})`;
					return;
				}

				// Colors only
				if (key === 'colors') {
					let colorValue = config[key][subKey];
					if (
						typeof colorValue === 'object' &&
						!Array.isArray(colorValue)
					) {
						colorValue = colorValue.value;
					}
					colorValue = String(colorValue);

					obj[key] = obj[key] || {};
					obj[key][
						subKey
					] = `var(--theme-${key}-${subKey}, ${colorValue})`;

					// Use the build in opacity utilities if three comma-separated values are provided
					const splitValue = colorValue.split(',');
					if (
						config[key][subKey].isListedRgb ||
						(splitValue.length === 3 &&
							splitValue.every((value) => {
								const trimmed = value.trim();
								return String(+trimmed) === trimmed;
							}))
					) {
						obj[key][subKey] = ({
							opacityVariable,
							opacityValue,
						}) => {
							if (opacityValue !== undefined) {
								return `rgba(var(--theme-${key}-${subKey}), ${opacityValue})`;
							}
							if (opacityVariable !== undefined) {
								return `rgba(var(--theme-${key}-${subKey}), var(${opacityVariable}, 1))`;
							}
							return `rgb(var(--theme-${key}-${subKey}))`;
						};
					}

					return;
				}

				// Ordinary setup
				obj[key] = obj[key] || {};
				obj[key][
					subKey
				] = `var(--theme-${key}-${subKey}, var(--theme-${key}-${subKey}--sm))`;

				// FontSize only:
				if (key === 'fontSize') {
					const lineHeight = config?.lineHeight?.[subKey];
					const letterSpacing = config?.letterSpacing?.[subKey];
					if (lineHeight || letterSpacing) {
						const extras = {};
						if (lineHeight) {
							extras.lineHeight = `var(--theme-lineHeight-${subKey}, var(--theme-lineHeight-${subKey}--sm))`;
						}
						if (letterSpacing) {
							extras.letterSpacing = `var(--theme-letterSpacing-${subKey}, var(--theme-letterSpacing-${subKey})--sm)`;
						}
						obj[key][subKey] = [
							`var(--theme-${key}-${subKey}, var(--theme-${key}-${subKey}--sm))`,
							extras,
						];
					}
				}
			});
		}
	});
	return obj;
}

// Function to restructure font size object
function restructureFontSizeObject(object) {
	return Object.keys(typeof object === 'object' ? object : {}).reduce(
		(newObject, key) => {
			['fontSize', 'lineHeight', 'letterSpacing'].forEach((property) => {
				if (object[key][property]) {
					// Make base object if it doesn't exist
					if (!newObject[property]) {
						newObject[property] = {};
					}

					// Add the sub objects
					newObject[property][key] = object[key][property];
				}
			});

			return newObject;
		},
		{}
	);
}

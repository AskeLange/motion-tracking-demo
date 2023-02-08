/**
 * All easings provided by:
 * https://easings.net/
 */

/**
 * Ease In Sine
 *
 * @param {Number} x: value between 0 and 1
 * @returns {Number} y: value between 0 and 1
 */
export function easeInSine(x) {
	return 1 - Math.cos((x * Math.PI) / 2);
}

/**
 * Ease Out Sine
 *
 * @param {Number} x: value between 0 and 1
 * @returns {Number} y: value between 0 and 1
 */
export function easeOutSine(x) {
	return Math.sin((x * Math.PI) / 2);
}

/**
 * Ease In-Out Sine
 *
 * @param {Number} x: value between 0 and 1
 * @returns {Number} y: value between 0 and 1
 */
export function easeInOutSine(x) {
	return -(Math.cos(Math.PI * x) - 1) / 2;
}

/**
 * Ease In Cubic
 *
 * @param {Number} x: value between 0 and 1
 * @returns {Number} y: value between 0 and 1
 */
export function easeInCubic(x) {
	return x ** 3;
}

/**
 * Ease Out Cubic
 *
 * @param {Number} x: value between 0 and 1
 * @returns {Number} y: value between 0 and 1
 */
export function easeOutCubic(x) {
	return 1 - Math.pow(1 - x, 3);
}

/**
 * Ease In-Out Cubic
 *
 * @param {Number} x: value between 0 and 1
 * @returns {Number} y: value between 0 and 1
 */
export function easeInOutCubic(x) {
	return x < 0.5 ? 4 * x ** 3 : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
